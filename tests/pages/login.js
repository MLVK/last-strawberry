import PO from '../page-object';

const {
  clickable,
  fillable,
  text,
  visitable
} = PO;

export default PO.create({
  visit: visitable('/login'),
  username: fillable('.username'),
  password: fillable('.password'),
  clickSubmit: clickable(".submit"),
  errorMessage: text('.error')
});
