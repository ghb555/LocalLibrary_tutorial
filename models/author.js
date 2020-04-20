var mongoose = require('mongoose');
var moment = require('moment');

//Определяем схему
var Schema = mongoose.Schema;

// Конструктор Schema создает новый экземпляр схемы
var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// Виртуальное свойство для полного имени автора
AuthorSchema
.virtual('name')
.get(function () {
  return this.family_name + ', ' + this.first_name;
});

// Виртуальное свойство - URL автора
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

// Virtual for Author's Date of_birth
AuthorSchema
.virtual('date_of_birth_formatted')
.get(function () {
  return this.date_of_birth ? moment(this.date_of_birth).format('YYYY-MM-DD') : '';
});

// Virtual for Author's date_of_death formatted
AuthorSchema
.virtual('date_of_death_formatted')
.get(function () {
  return this.date_of_death ? moment(this.date_of_death).format('YYYY-MM-DD') : '';
});

// Virtual for Author's lifespan formatted
AuthorSchema
.virtual('lifespan_formatted')
.get(function () {
  return this.date_of_birth_formatted + ' - ' + this.date_of_death_formatted;
});


// Компилируем модель из схемы
// Создание модели Author из схемы AuthorSchema и экспортирование модели
// 'Author' - имя создаваемой для модели коллекции.
module.exports = mongoose.model('Author', AuthorSchema);