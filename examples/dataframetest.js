var spark = require('../spark.js');

var sparkContext = new spark.SparkContext("local[*]", "dataframe test");
var sqlContext = new spark.SQLContext(sparkContext);

var dataFrame = sqlContext.read.json("/tmp/examples/test.json");
//var gd = dataFrame.groupBy(dataFrame.col("first"));
//var df2 = gd.count();
dataFrame.show();
