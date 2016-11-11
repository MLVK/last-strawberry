const formatDate = date => moment(date).format("YYYY-MM-DD");
const formatFullDate = date => moment(date).format("ddd MM-DD-YYYY");

export {
  formatDate,
  formatFullDate
}
