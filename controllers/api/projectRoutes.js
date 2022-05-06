const router = require('express').Router();
const { Project } = require('../../models');

router.get('/', async (req, res) => {
  try {
    // searches for all projects
    const projectData = await Project.findAll();
    // creates a new array with the project data
    const projects = projectData.map((project) => project.get({ plain: true }));
    // renders the data into a handlebar called projects
    res.render('projects', { project: projects });
    res.status(200);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    // searches for all projects
    const projectData = await Project.findByPk(req.params.id);
    // creates a new array with the project data
    const projects = projectData.map((project) => project.get({ plain: true }));
    // renders the data into a handlebar called projects
    res.render('projects', { project: projects });
    res.status(200);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newProject = await Project.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const projectData = await Project.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
