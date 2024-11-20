// routes/groups.js
const express = require('express');
const router = express.Router();
const Group = require('../models/Group');
const Expense = require('../models/Expense');

// Create a group
router.post('/create', async (req, res) => {
  const { name, members } = req.body;
  try {
    const group = new Group({ name, members });
    await group.save();
    res.status(201).json(group);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Add an expense to a group
router.post('/:groupId/expenses', async (req, res) => {
  const { groupId } = req.params;
  const { description, amount, paidBy, splitBetween } = req.body;

  try {
    const expense = new Expense({ description, amount, paidBy, splitBetween, groupId });
    await expense.save();

    const group = await Group.findById(groupId);
    group.expenses.push(expense._id);
    await group.save();

    res.status(201).json(expense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get balances for a group
router.get('/:groupId/balances', async (req, res) => {
  const { groupId } = req.params;

  try {
    const group = await Group.findById(groupId).populate('expenses');
    const balances = {};

    group.expenses.forEach((expense) => {
      const splitAmount = expense.amount / expense.splitBetween.length;
      expense.splitBetween.forEach((user) => {
        if (user.toString() !== expense.paidBy.toString()) {
          balances[user] = (balances[user] || 0) - splitAmount;
          balances[expense.paidBy] = (balances[expense.paidBy] || 0) + splitAmount;
        }
      });
    });

    res.json(balances);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
