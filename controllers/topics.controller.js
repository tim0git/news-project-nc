const { selectAllTopics } = require("../model/topics.model");

exports.getAllTopics = (req, res, next) => {
  selectAllTopics()
    .then((result) => {
        console.log(result);
        
      return res.status(200).send({ topics: result });
    })
    .catch(next);
};
