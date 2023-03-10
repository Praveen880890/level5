'use strict';
const {Op}=require('sequelize');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    static async addTask(params) {
			return await Todo.create(params);
		}
		static async showList() {
			console.log("My Todo list \n");

			console.log("Overdue");
			// FILL IN HERE
			const overdueLists = await Todo.overdue();
			console.log(
				overdueLists.map((data) => data.displayableString()).join("\n")
			);
			console.log("\n");

			console.log("Due Today");
			// FILL IN HERE

			const dueTodayLists = await Todo.dueToday();
			console.log(
				dueTodayLists.map((data) => data.displayableString()).join("\n")
			);
			console.log("\n");

			console.log("Due Later");
			// FILL IN HERE
			const dueLaterLists = await Todo.dueLater();
			console.log(
				dueLaterLists.map((data) => data.displayableString()).join("\n")
			);
		}

		static async overdue() {
			// FILL IN HERE TO RETURN OVERDUE ITEMS
			return Todo.findAll({
				where: {
					dueDate: {
						[Op.lt]: new Date(),
					},
				},
			});
		}

		static async dueToday() {
			// FILL IN HERE TO RETURN ITEMS DUE tODAY
			return Todo.findAll({
				where: {
					dueDate: {
						[Op.eq]: new Date(),
					},
				},
				order: [["id", "ASC"]],
			});
		}

		static async dueLater() {
			// FILL IN HERE TO RETURN ITEMS DUE LATER
			return Todo.findAll({
				where: {
					dueDate: {
						[Op.gt]: new Date(),
					},
				},
				order: [["id", "ASC"]],
			});
		}

		static async markAsComplete(id) {
			// FILL IN HERE TO MARK AN ITEM AS COMPLETE
			return await Todo.update(
				{ completed: true },
				{
					where: { id: id },
				}
			);
		}

		displayableString() {
			let checkbox = this.completed ? "[x]" : "[ ]";
			let date =this.dueDate === new Date().toLocaleDateString("en-CA")? "": ` ${this.dueDate}`;
			return `${this.id}. ${checkbox} ${this.title}${date}`;
		}
	}
  
  Todo.init({
    title: DataTypes.STRING,
    dueDate: DataTypes.DATEONLY,
    completed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};