const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const Mylearning = require('../../models/Mylearning');

//get current user's my learnings (private)
router.get('/', auth,
    async (req, res) => {
        try {
            const mylearnings = await Mylearning.find({ user: req.user.id }).sort({ date: -1 });
            // if (mylearnings.length === 0) {
            //     return res.status(400).json({ msg: 'No learnings found for this user' });
            // }
            res.json(mylearnings);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }

);


//post a learning for the user(private)
router.post('/', [auth, [
    check('topic', 'Topic name is required').not().isEmpty()
]],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const mylearningfields = {};
        mylearningfields.user = req.user.id;
        mylearningfields.topic = req.body.topic;
        try {
            let mylearning = await Mylearning.findOne({ user: req.user.id, topic: req.body.topic });
            if (mylearning) {
                return res.status('400').send({ msg: 'There is already a topic with the same name' });
            }
            mylearning = new Mylearning(mylearningfields);
            await mylearning.save();
            res.json(mylearning);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }


    }
);

//get a topic with id
router.get('/:id', auth,
    async (req, res) => {

        try {
            const mylearning = await Mylearning.findById(req.params.id);
            if (!mylearning) {
                return res.status(404).json({ msg: 'Topic not found' });
            }
            res.json(mylearning);
        } catch (err) {
            console.error(err.message);
            console.error(err.kind);
            if (err.kind === 'ObjectId') {
                return res.status(404).json({ msg: 'Topic not found' });
            }
            res.status(500).send('Server Error');
        }


    }

);

router.post('/subtopic/:id',
    [auth,
        [check('subtopicname', 'Text is required').not().isEmpty()]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const mylearning = await Mylearning.findById(req.params.id);
            const newSubTopic = {
                subtopicname: req.body.subtopicname
            }
            mylearning.subtopics.push(newSubTopic);
            await mylearning.save();
            res.json({ id: mylearning.subtopics[mylearning.subtopics.length - 1]._id, subtopicsArray: mylearning.subtopics });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

router.post('/links/:id/:subtopic_id', [auth, [check('text', 'Link should not be empty').not().isEmpty()]],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const mylearning = await Mylearning.findById(req.params.id);
            const subtopic = mylearning.subtopics.find(
                subtopic => subtopic.id === req.params.subtopic_id
            );
            const newLink = {
                text: req.body.text
            }
            subtopic.links.push(newLink);
            await mylearning.save();
            res.json(subtopic.links);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);


router.put('/notes/:id/:subtopic_id', auth,
    async (req, res) => {
        try {
            const mylearning = await Mylearning.findById(req.params.id);
            const subtopic = mylearning.subtopics.find(
                subtopic => subtopic.id === req.params.subtopic_id
            )
            subtopic.notes = req.body.notes;
            await mylearning.save();
            res.json(subtopic.notes);

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);


//delete a link
router.delete('/links/:id/:subtopic_id/:link_id', auth,
    async (req, res) => {
        try {
            const mylearning = await Mylearning.findById(req.params.id);
            //pull out a subtopic
            const subtopic = mylearning.subtopics.find(
                (subtopic) => subtopic.id === req.params.subtopic_id
            )
            if (!subtopic) {
                return res.status(404).json({ msg: 'No subtopic found' })
            }
            const link = subtopic.links.find(
                (link) => link.id === req.params.link_id
            )
            if (!link) {
                return res.status(404).json({ msg: 'No link found' });
            }
            const removeIndex = subtopic.links.map((link) => link.id).indexOf(req.params.link_id);
            subtopic.links.splice(removeIndex, 1);
            await mylearning.save();
            res.json(subtopic.links);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }

    }
)

//delete a subtopic
router.delete('/subtopic/:id/:subtopic_id', auth,
    async (req, res) => {
        try {
            const mylearning = await Mylearning.findById(req.params.id);
            const subtopic = mylearning.subtopics.find(
                (subtopic) => subtopic.id === req.params.subtopic_id
            );
            if (!subtopic) {
                return res.status(404).json({ msg: 'No subtopic found' });
            }
            const removeIndex = mylearning.subtopics.map(item => item.id).indexOf(req.params.subtopic_id);

            mylearning.subtopics.splice(removeIndex, 1);
            await mylearning.save();
            res.json(mylearning.subtopics);

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

router.delete('/:id', auth,
    async (req, res) => {
        try {
            const mylearning = await Mylearning.findById(req.params.id);
            if (!mylearning) {
                return res.status(404).json({ msg: 'Topic not found' });
            }
            await mylearning.remove();
            res.json({ msg: 'Topic has been deleted' });
        } catch (err) {
            console.error(err.message);
            if (err.kind === 'ObjectId') {
                return res.status(404).json({ msg: 'Topic not found' });
            }
            res.status(500).send('Server error');
        }
    }
);

module.exports = router;
