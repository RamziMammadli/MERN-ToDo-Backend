import Todo from "../models/todoModel.js";

const addUserTodo = async (req, res) => {
  try {
    const { title, body } = req.body;

    if (req.user) {
      const todo = await Todo.create({
        title,
        body,
        user_id: req.user._id,
      });

      res.status(201).json(todo);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserTodos = async (req, res) => {
    try {
      if (req.user) {
        const userTodos = await Todo.find({ user_id: req.user._id });
        res.status(200).json(userTodos);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

const deleteUserTodo = async (req, res) => {
  try {
    if (req.user) {
      const deleteTodo = await Todo.findById(req.params.id);

      if (deleteTodo && deleteTodo.user_id.toString() === req.user._id.toString()) {
        await Todo.deleteOne({ _id: req.params.id });
        res.json({ message: `${req.params.id} id-li post silindi` });
      } else {
        res.status(404).json({ message: 'Todo not found or unauthorized' });
      }
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { addUserTodo, getUserTodos, deleteUserTodo };
