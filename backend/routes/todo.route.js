const { Router } = require("express");
const { TodoModel } = require("../models/todo.model");


const todoRouter = Router();

//get
todoRouter.get("/", async (req, res) => {
    const result = await TodoModel.find({ user_id: req.body.user_id });
    res.send(result);
});

//post 
todoRouter.post("/create", async (req, res) => {
    const { taskname, status, tag, user_id } = req.body;
    const todo = new TodoModel({
        taskname,
        status,
        tag,
        user_id,
    });
    await todo.save();
    res.send(todo);
});

//patch
todoRouter.patch("/edit/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const todo = await TodoModel.findOne({
            _id: id,
            user_id: req.body.user_id,
        });

        if (req.body.title) {
            todo.title = req.body.title;
        }

        if (req.body.todo) {
            todo.todo = req.body.todo;
        }

        if (req.body.tag) {
            todo.tag = req.body.tag;
        }

        await todo.save();
        res.send(todo);
    } catch (error) {
        res.status(404);
        res.send({ error: "Todo doesn't found" });
    }
});

//delete
todoRouter.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await TodoModel.deleteOne({ _id: id, user_id: req.body.user_id });
        res.status(204).send();
    } catch {
        res.status(404);
        res.send({ error: "Todo doesn't found" });
    }
});

module.exports = {
    todoRouter,
};
