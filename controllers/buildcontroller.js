let express = require("express");
let router = express.Router();
let validateSession = require("../middleware/validate-session");
const { route } = require("./usercontroller");
const Build = require("../db").import("../models/build.js");

router.post("/create", validateSession, (req, res) => {
    const buildEntry = {
        motherboard: req.body.build.motherboard,
        cpu: req.body.build.cpu,
        gpu: req.body.build.gpu,
        ram: req.body.build.ram,
        case: req.body.build.case,
        owner: req.user.id,
    };
    Build.create(buildEntry)
        .then((build) => res.status(200).json(build))
        .catch((err) => res.status(500).json({ error: err }));
});

router.get("/", (req, res) => {
    Build.findAll()
        .then((build) => res.status(200).json(build))
        .catch((err) => res.status(500).json({ error: err }));
});

router.get("/mine", validateSession, (req, res) => {
    let userid = req.user.id;
    Build.findAll({
        where: { owner: userid },
    })
        .then((build) => res.status(200).json(build))
        .catch((err) => res.status(500).json({ error: err }));
});

router.put("/update/:id", validateSession, function (req, res) {
    const updateBuild = {
        motherboard: req.body.build.motherboard,
        cpu: req.body.build.cpu,
        gpu: req.body.build.gpu,
        ram: req.body.build.ram,
        case: req.body.build.case,
        owner: req.user.id,
    };

    const query = { where: { id: req.params.entryId, owner: req.user.id } };

    Build.update(updateBuild, query)
        .then((build) => res.status(200).json(build))
        .catch((err) => res.status(500).json({ error: err }));
});

router.delete("/delete/:id", validateSession, function (req, res) {
    const query = { where: { id: req.params.id, owner: req.user.id } };
    
    Build.destroy(query)
    .then(() => res.status(200).json({ message: "Build removed"}))
    .catch((err) => res.status(500).json({error: err}));
})
module.exports = router;

