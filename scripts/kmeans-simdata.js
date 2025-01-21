// ############ SETUP ###############

function setup() {
  d3.select("h3#info").text("Using simulated data");
  d3.select("#kmse").text("Kmeans square error:");
  d3.select("div#plot").select("svg").remove();
  d3.select("div#buttons").select("input").remove();

  d3.select("div#buttons")
    .append("input")
    .attr("type", "button");

  svg = d3.select("div#plot")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  // create plot area
  svg.append("g")
    .attr("id", "plotarea")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  svg.select("g#plotarea")
    .append("rect")
    .attr("width", innerWidth)
    .attr("height", innerHeight)
    .attr("fill", "transparent");

  // create x-axis
  svg.select("g#plotarea")
    .append("g")
    .attr("id", "xaxis")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(xAxis);

  // create x-axis label
  svg.select("g#plotarea")
    .append("text")
    .attr("id", "xlab")
    .attr("x", innerWidth / 2)
    .attr("y", innerHeight + .75 * margin.bottom)
    .attr("text-anchor", "middle")
    .text("x");

  // create y-axis
  svg.select("g#plotarea")
    .append("g")
    .attr("id", "yaxis")
    .call(yAxis);

  // create y-axis label
  svg.select("g#plotarea")
    .append("text")
    .attr("id", "ylab")
    .attr("x", -margin.left / 2)
    .attr("y", innerHeight / 2)
    .attr("text-anchor", "middle")
    .attr("transform", `rotate(-90, ${0 - .75 * margin.left}, ${innerHeight / 2})`)
    .text("y");

    // plot initial data
    plotpoints();

    // instruct user to choose k
    choosek();
};



// ############ CHOOSEK ###############

function choosek() {
  svg.select("g#plotarea")
    .select("rect")
    .on("mousedown", null)
    .on("mouseup", null)
    .on("mousemove", null);

  d3.select("h3#info").text("Choose the number of clusters");

  d3.select("div#buttons")
    .select("input")
    .attr("hidden", "hidden");

  const kvalues = d3.range(11);

  d3.select("div#buttons")
    .append("select")
    .attr("name", "numclusters")
    .attr("id", "k")
    .on("change", function () {
      const k = d3.select(this).property("value");
      d3.select("svg").datum(k);
      kmeansbegin();
    })
    .append("option")
    .attr("value", "select")
    .text("Choose k");

  d3.select("div#buttons").select("select#k")
    .selectAll("option")
    .data(kvalues)
    .enter()
    .append("option")
    .attr("value", d => d)
    .text(d => d);
}

// ############ REDO ###############

function redo() {
  d3.select("#centroids").remove();
  d3.select("#lines").remove();
  d3.select("#kmse").text("Kmeans square error:");
  kmeansbegin();
}
// ############ PLOTPOINTS ################

function plotpoints() {
    const simdata =[
    {"x":3.5019,"y":2.9494,"label":"1"},
{"x":3.7128,"y":3.1593,"label":"1"},
{"x":2.7774,"y":4.772,"label":"1"},
{"x":2.2125,"y":3.8176,"label":"1"},
{"x":2.267,"y":3.9078,"label":"1"},
{"x":4.0295,"y":2.2929,"label":"1"},
{"x":2.0212,"y":3.0446,"label":"1"},
{"x":3.9489,"y":2.6175,"label":"1"},
{"x":4.1963,"y":4.686,"label":"1"},
{"x":3.8637,"y":4.0446,"label":"1"},
{"x":3.4575,"y":3.9657,"label":"1"},
{"x":3.3427,"y":3.5148,"label":"1"},
{"x":2.8107,"y":1.6265,"label":"1"},
{"x":1.4434,"y":3.2628,"label":"1"},
{"x":3.0494,"y":0.8809,"label":"1"},
{"x":2.0385,"y":2.7311,"label":"1"},
{"x":1.6858,"y":3.4595,"label":"1"},
{"x":4.311,"y":1.82,"label":"1"},
{"x":3.9535,"y":3.4676,"label":"1"},
{"x":2.6762,"y":2.4194,"label":"1"},
{"x":3.0054,"y":3.8981,"label":"1"},
{"x":3.7433,"y":2.9876,"label":"1"},
{"x":3.948,"y":5.1148,"label":"1"},
{"x":2.9715,"y":2.3159,"label":"1"},
{"x":2.9767,"y":1.9933,"label":"1"},
{"x":3.3094,"y":2.6568,"label":"1"},
{"x":4.1419,"y":3.0713,"label":"1"},
{"x":3.0114,"y":1.5122,"label":"1"},
{"x":3.458,"y":2.103,"label":"1"},
{"x":4.7713,"y":4.3625,"label":"1"},
{"x":1.1431,"y":2.5759,"label":"1"},
{"x":1.9044,"y":1.813,"label":"1"},
{"x":3.6257,"y":1.4984,"label":"1"},
{"x":3.9502,"y":2.4702,"label":"1"},
{"x":1.769,"y":4.3291,"label":"1"},
{"x":1.4147,"y":4.508,"label":"1"},
{"x":3.6353,"y":2.5633,"label":"1"},
{"x":2.941,"y":3.363,"label":"1"},
{"x":4.0366,"y":2.3378,"label":"1"},
{"x":3.0619,"y":3.9515,"label":"1"},
{"x":3.9472,"y":3.8648,"label":"1"},
{"x":2.726,"y":3.4227,"label":"1"},
{"x":3.2645,"y":2.3922,"label":"1"},
{"x":2.4336,"y":2.6133,"label":"1"},
{"x":3.7929,"y":2.4003,"label":"1"},
{"x":4.0245,"y":3.9804,"label":"1"},
{"x":3.5699,"y":3.0337,"label":"1"},
{"x":3.1165,"y":3.5344,"label":"1"},
{"x":2.7792,"y":4.0049,"label":"1"},
{"x":2.812,"y":2.5094,"label":"1"},
{"x":3.0757,"y":2.2924,"label":"1"},
{"x":1.476,"y":0.1116,"label":"1"},
{"x":2.3396,"y":3.7499,"label":"1"},
{"x":4.2594,"y":1.6989,"label":"1"},
{"x":4.0219,"y":4.3458,"label":"1"},
{"x":3.2993,"y":5.7255,"label":"1"},
{"x":2.199,"y":2.1837,"label":"1"},
{"x":2.1947,"y":3.1918,"label":"1"},
{"x":4.518,"y":2.1244,"label":"1"},
{"x":3.3986,"y":2.7282,"label":"1"},
{"x":3.9973,"y":3.41,"label":"1"},
{"x":3.5789,"y":2.7923,"label":"1"},
{"x":3.3366,"y":2.4245,"label":"1"},
{"x":2.378,"y":3.0485,"label":"1"},
{"x":4.5065,"y":0.7755,"label":"1"},
{"x":1.513,"y":3.0817,"label":"1"},
{"x":1.6221,"y":1.5698,"label":"1"},
{"x":3.2916,"y":2.1345,"label":"1"},
{"x":2.3216,"y":2.1531,"label":"1"},
{"x":3.2394,"y":3.4779,"label":"1"},
{"x":3.5242,"y":2.5268,"label":"1"},
{"x":1.8741,"y":4.1289,"label":"1"},
{"x":1.342,"y":3.4545,"label":"1"},
{"x":2.7556,"y":1.3899,"label":"1"},
{"x":4.7469,"y":2.2321,"label":"1"},
{"x":3.6302,"y":2.8057,"label":"1"},
{"x":3.125,"y":1.5046,"label":"1"},
{"x":2.9486,"y":4.4489,"label":"1"},
{"x":3.9002,"y":3.246,"label":"1"},
{"x":3.6976,"y":0.2164,"label":"1"},
{"x":4.2044,"y":1.4301,"label":"1"},
{"x":2.0037,"y":2.1244,"label":"1"},
{"x":4.8721,"y":3.8061,"label":"1"},
{"x":3.4758,"y":3.2934,"label":"1"},
{"x":1.9362,"y":1.6979,"label":"1"},
{"x":2.7723,"y":5.4168,"label":"1"},
{"x":3.4196,"y":4.9538,"label":"1"},
{"x":1.6428,"y":2.7445,"label":"1"},
{"x":3.5165,"y":2.6891,"label":"1"},
{"x":3.2257,"y":3.3098,"label":"1"},
{"x":1.8778,"y":3.9472,"label":"1"},
{"x":2.7067,"y":3.2655,"label":"1"},
{"x":3.0351,"y":3.1367,"label":"1"},
{"x":5.9492,"y":3.1096,"label":"1"},
{"x":3.2037,"y":2.0879,"label":"1"},
{"x":2.0178,"y":3.4754,"label":"1"},
{"x":3.7436,"y":4.0208,"label":"1"},
{"x":2.3821,"y":3.8267,"label":"1"},
{"x":2.9153,"y":3.3642,"label":"1"},
{"x":3.6274,"y":4.2118,"label":"1"},
{"x":5.2621,"y":3.1344,"label":"2"},
{"x":6.2711,"y":4.4175,"label":"2"},
{"x":6.5025,"y":3.9842,"label":"2"},
{"x":8.0915,"y":4.8114,"label":"2"},
{"x":7.9721,"y":5.8069,"label":"2"},
{"x":6.9628,"y":3.8207,"label":"2"},
{"x":7.1664,"y":3.3014,"label":"2"},
{"x":7.4658,"y":3.5348,"label":"2"},
{"x":9.3746,"y":4.3946,"label":"2"},
{"x":6.1778,"y":5.0503,"label":"2"},
{"x":6.0798,"y":3.6051,"label":"2"},
{"x":5.7062,"y":3.3331,"label":"2"},
{"x":7.3402,"y":3.5298,"label":"2"},
{"x":5.9549,"y":3.7333,"label":"2"},
{"x":6.35,"y":3.3382,"label":"2"},
{"x":6.0521,"y":2.7826,"label":"2"},
{"x":7.4864,"y":2.8934,"label":"2"},
{"x":8.1684,"y":1.9985,"label":"2"},
{"x":7.3095,"y":4.5388,"label":"2"},
{"x":7.3821,"y":5.2447,"label":"2"},
{"x":7.3858,"y":3.6786,"label":"2"},
{"x":7.6874,"y":4.3791,"label":"2"},
{"x":7.3453,"y":4.3661,"label":"2"},
{"x":6.1578,"y":3.4203,"label":"2"},
{"x":6.3782,"y":5.4098,"label":"2"},
{"x":5.815,"y":3.8861,"label":"2"},
{"x":7.1741,"y":4.6241,"label":"2"},
{"x":6.0327,"y":2.8209,"label":"2"},
{"x":6.9737,"y":3.5025,"label":"2"},
{"x":6.6572,"y":2.2583,"label":"2"},
{"x":6.9768,"y":3.8685,"label":"2"},
{"x":6.5668,"y":5.2594,"label":"2"},
{"x":7.3106,"y":5.3806,"label":"2"},
{"x":6.4711,"y":4.3611,"label":"2"},
{"x":6.0687,"y":3.9081,"label":"2"},
{"x":8.5728,"y":5.3328,"label":"2"},
{"x":6.9163,"y":3.9181,"label":"2"},
{"x":4.628,"y":3.1757,"label":"2"},
{"x":5.1874,"y":4.6831,"label":"2"},
{"x":7.6979,"y":3.7376,"label":"2"},
{"x":6.4901,"y":3.8878,"label":"2"},
{"x":6.817,"y":4.2619,"label":"2"},
{"x":7.4312,"y":5.2919,"label":"2"},
{"x":7.9078,"y":3.4758,"label":"2"},
{"x":7.2028,"y":3.5635,"label":"2"},
{"x":7.0123,"y":4.3069,"label":"2"},
{"x":5.03,"y":3.6813,"label":"2"},
{"x":6.6009,"y":2.3252,"label":"2"},
{"x":5.985,"y":3.0548,"label":"2"},
{"x":7.156,"y":3.531,"label":"2"},
{"x":8.2951,"y":4.4487,"label":"2"},
{"x":5.0986,"y":2.5336,"label":"2"},
{"x":8.2441,"y":3.2693,"label":"2"},
{"x":6.4458,"y":2.4368,"label":"2"},
{"x":9.2298,"y":5.2144,"label":"2"},
{"x":6.2682,"y":2.6196,"label":"2"},
{"x":6.5624,"y":3.0026,"label":"2"},
{"x":5.6468,"y":2.7381,"label":"2"},
{"x":7.094,"y":4.9769,"label":"2"},
{"x":7.1346,"y":3.8257,"label":"2"},
{"x":7.9555,"y":2.5906,"label":"2"},
{"x":7.9061,"y":4.4097,"label":"2"},
{"x":7.3996,"y":4.6099,"label":"2"},
{"x":8.0012,"y":5.152,"label":"2"},
{"x":6.5441,"y":3.9683,"label":"2"},
{"x":6.7397,"y":3.2817,"label":"2"},
{"x":5.0871,"y":3.9778,"label":"2"},
{"x":8.2142,"y":5.0206,"label":"2"},
{"x":8.7823,"y":4.7919,"label":"2"},
{"x":7.0402,"y":4.0694,"label":"2"},
{"x":7.8911,"y":4.712,"label":"2"},
{"x":6.1999,"y":4.3286,"label":"2"},
{"x":6.3778,"y":4.7177,"label":"2"},
{"x":6.4715,"y":3.1013,"label":"2"},
{"x":7.9603,"y":5.3541,"label":"2"},
{"x":7.1151,"y":3.164,"label":"2"},
{"x":6.8823,"y":3.6901,"label":"2"},
{"x":7.7391,"y":3.1736,"label":"2"},
{"x":6.61,"y":3.3357,"label":"2"},
{"x":5.5793,"y":4.2634,"label":"2"},
{"x":6.7658,"y":3.5,"label":"2"},
{"x":7.2368,"y":3.6727,"label":"2"},
{"x":6.3741,"y":3.5897,"label":"2"},
{"x":7.893,"y":4.3216,"label":"2"},
{"x":7.2417,"y":3.572,"label":"2"},
{"x":6.7672,"y":4.1559,"label":"2"},
{"x":7.0879,"y":2.8853,"label":"2"},
{"x":6.7526,"y":3.4758,"label":"2"},
{"x":7.636,"y":3.1685,"label":"2"},
{"x":7.5464,"y":3.5445,"label":"2"},
{"x":6.916,"y":4.7919,"label":"2"},
{"x":7.8637,"y":2.7206,"label":"2"},
{"x":7.1443,"y":4.2881,"label":"2"},
{"x":8.9747,"y":3.7378,"label":"2"},
{"x":8.0509,"y":4.8152,"label":"2"},
{"x":7.9234,"y":4.04,"label":"2"},
{"x":6.6117,"y":4.4068,"label":"2"},
{"x":5.0361,"y":2.2866,"label":"2"},
{"x":6.6723,"y":3.7393,"label":"2"},
{"x":6.3815,"y":3.8689,"label":"2"},
{"x":6.188,"y":6.4635,"label":"3"},
{"x":6.0341,"y":6.4713,"label":"3"},
{"x":6.02,"y":5.9706,"label":"3"},
{"x":6.2817,"y":4.7435,"label":"3"},
{"x":6.1267,"y":6.4575,"label":"3"},
{"x":4.6031,"y":3.9859,"label":"3"},
{"x":7.9624,"y":6.7911,"label":"3"},
{"x":4.3367,"y":5.0306,"label":"3"},
{"x":5.6699,"y":5.4218,"label":"3"},
{"x":4.5481,"y":5.0114,"label":"3"},
{"x":5.8988,"y":6.1298,"label":"3"},
{"x":5.9175,"y":3.8139,"label":"3"},
{"x":4.3171,"y":4.6268,"label":"3"},
{"x":5.2705,"y":4.9349,"label":"3"},
{"x":3.2028,"y":5.5258,"label":"3"},
{"x":6.4733,"y":5.5642,"label":"3"},
{"x":6.0775,"y":6.2993,"label":"3"},
{"x":5.6372,"y":5.0358,"label":"3"},
{"x":4.5964,"y":4.7606,"label":"3"},
{"x":6.0987,"y":5.3174,"label":"3"},
{"x":5.2702,"y":5.8645,"label":"3"},
{"x":4.6209,"y":4.3763,"label":"3"},
{"x":5.8943,"y":5.4572,"label":"3"},
{"x":4.4019,"y":5.4445,"label":"3"},
{"x":4.2586,"y":4.1434,"label":"3"},
{"x":4.5947,"y":4.8203,"label":"3"},
{"x":4.2605,"y":5.4336,"label":"3"},
{"x":6.4674,"y":7.8719,"label":"3"},
{"x":4.6432,"y":4.7842,"label":"3"},
{"x":5.1695,"y":4.5701,"label":"3"},
{"x":5.4729,"y":5.2047,"label":"3"},
{"x":5.8284,"y":6.0974,"label":"3"},
{"x":5.2929,"y":6.6147,"label":"3"},
{"x":5.3849,"y":5.3759,"label":"3"},
{"x":5.0975,"y":4.8282,"label":"3"},
{"x":4.9136,"y":7.1268,"label":"3"},
{"x":7.1284,"y":5.808,"label":"3"},
{"x":7.2266,"y":7.2876,"label":"3"},
{"x":4.5011,"y":4.9988,"label":"3"},
{"x":4.9946,"y":4.7806,"label":"3"},
{"x":7.015,"y":6.9831,"label":"3"},
{"x":6.4695,"y":5.628,"label":"3"},
{"x":4.0106,"y":5.1953,"label":"3"},
{"x":6.3334,"y":4.9281,"label":"3"},
{"x":6.1837,"y":4.5495,"label":"3"},
{"x":5.9282,"y":4.5451,"label":"3"},
{"x":4.2125,"y":4.8391,"label":"3"},
{"x":5.3515,"y":3.956,"label":"3"},
{"x":5.2997,"y":6.0466,"label":"3"},
{"x":5.4232,"y":5.2477,"label":"3"},
{"x":4.6085,"y":5.8806,"label":"3"},
{"x":4.2903,"y":4.2987,"label":"3"},
{"x":6.2735,"y":5.6574,"label":"3"},
{"x":6.4157,"y":4.1644,"label":"3"},
{"x":7.0174,"y":6.1865,"label":"3"},
{"x":4.6571,"y":4.3018,"label":"3"},
{"x":8.0013,"y":7.1622,"label":"3"},
{"x":4.2761,"y":4.4875,"label":"3"},
{"x":6.1052,"y":4.7849,"label":"3"},
{"x":5.1418,"y":6.2257,"label":"3"},
{"x":6.9438,"y":6.1238,"label":"3"},
{"x":6.0555,"y":4.9882,"label":"3"},
{"x":5.2272,"y":5.3281,"label":"3"},
{"x":5.721,"y":5.8949,"label":"3"},
{"x":5.5356,"y":6.4462,"label":"3"},
{"x":3.7686,"y":5.4844,"label":"3"},
{"x":6.8206,"y":6.8895,"label":"3"},
{"x":6.0382,"y":5.6374,"label":"3"},
{"x":5.8729,"y":6.6102,"label":"3"},
{"x":4.7779,"y":5.6307,"label":"3"},
{"x":5.8779,"y":5.7791,"label":"3"},
{"x":4.4796,"y":6.837,"label":"3"},
{"x":5.4001,"y":5.8111,"label":"3"},
{"x":6.228,"y":7.404,"label":"3"},
{"x":6.3485,"y":7.1223,"label":"3"},
{"x":5.6063,"y":5.0423,"label":"3"},
{"x":6.3563,"y":5.9486,"label":"3"},
{"x":6.12,"y":5.8677,"label":"3"},
{"x":5.2092,"y":6.4636,"label":"3"},
{"x":6.0949,"y":4.7255,"label":"3"},
{"x":4.6609,"y":3.7447,"label":"3"},
{"x":5.0421,"y":5.4947,"label":"3"},
{"x":5.8744,"y":5.2845,"label":"3"},
{"x":4.6873,"y":4.6924,"label":"3"},
{"x":5.3603,"y":6.3301,"label":"3"},
{"x":7.0677,"y":6.2666,"label":"3"},
{"x":5.1995,"y":6.0448,"label":"3"},
{"x":5.6817,"y":4.6444,"label":"3"},
{"x":6.6403,"y":7.7442,"label":"3"},
{"x":4.9148,"y":5.0792,"label":"3"},
{"x":4.9431,"y":5.2353,"label":"3"},
{"x":6.8811,"y":6.1372,"label":"3"},
{"x":7.0076,"y":5.8088,"label":"3"},
{"x":4.7459,"y":3.5769,"label":"3"},
{"x":5.5573,"y":5.3282,"label":"3"},
{"x":4.2909,"y":3.7249,"label":"3"},
{"x":6.727,"y":6.2073,"label":"3"},
{"x":5.0541,"y":5.3077,"label":"3"},
{"x":5.9065,"y":4.5158,"label":"3"},
{"x":6.1493,"y":6.0876,"label":"3"}];

  svg.select("g#plotarea")
    .selectAll("circle")
    .data(simdata)
    .enter()
    .append("circle")
      .attr("cx", d => xScale(d.x))
      .attr("cy", d => yScale(d.y))
      .attr("fill-opacity", "0.5")
      .attr("r", "3");

};


// ############ KMEANSBEGIN ###############

function kmeansbegin() {
  d3.select("div#buttons").select("select#k").remove();

  const k = d3.select("svg").datum();

  const allpoints = svg.selectAll("circle");
  data = allpoints.data();

  data = data.map(d => ({ x: d.x, y: d.y, cluster: d3.randomInt(k)() }));

  const method = d3.select('input[name="initmethod"]:checked').node().value;

  if (method == "points") {

  d3.select("div#buttons").select("input")
    .attr("hidden", null)
    .attr("value", "Add centroids")
    .attr("type", "button")
    .attr("onclick", "update_centroids()");

  allpoints
    .data(data) // updates with cluster info
    .style("fill", d => colorScale(d.cluster));

  // draw initial centroids (with no area)
  let centroids = d3.range(k).map(e => ({
    x: d3.mean(data.filter(d => d.cluster == e).map(d => d.x)),
    y: d3.mean(data.filter(d => d.cluster == e).map(d => d.y)),
    cluster: e
  }));

    svg.select("g#plotarea")
    .append("g")
    .attr("id", "centroids")
    .selectAll("circle")
    .data(centroids)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.x))
    .attr("cy", d => yScale(d.y))
    .attr("r", "0")
    .style("fill", d => colorScale(d.cluster));

  } else {
    const indices = d3.shuffle(d3.range(data.length)).slice(0, k);
    let centroids = data.filter((d, i) => indices.includes(i))
      .map((d, i) => ({...d, cluster:i})); // add cluster

    svg.select("g#plotarea")
      .append("g")
      .attr("id", "centroids")
      .selectAll("circle")
      .data(centroids)
      .enter()
      .append("circle")
      .attr("cx", d => xScale(d.x))
      .attr("cy", d => yScale(d.y))
      .attr("r", "5")
      .style("fill", d => colorScale(d.cluster));

  d3.select("div#buttons").select("input")
    .attr("hidden", null)
    .attr("value", "Assign points")
    .attr("type", "button")
    .attr("onclick", "reassign_points()");
  }



  // create lines group
  svg.select("g#plotarea")
    .append("g")
    .attr("id", "lines");
}


// ############ UPDATE_CENTROIDS ###############

function update_centroids() {
  d3.select("h3#info").text("Click button to reassign points.");

  const k = d3.select("svg").datum();

  const oldcentroids = svg
    .select("#centroids")
    .selectAll("circle")
    .data();

  const centroids = d3.range(k).map(e => ({
    x: d3.mean(data.filter(d => d.cluster == e).map(d => d.x)),
    y: d3.mean(data.filter(d => d.cluster == e).map(d => d.y)),
    cluster: e
  }));

  // calculate and display  mse
  let kmse = 0;
  for (let j = 0; j < data.length; j++) {
    kmse = kmse + distsquared(data[j], centroids[data[j].cluster]);
  }

  d3.select("#kmse").text("Kmeans square error: " + kmse.toFixed(5));

  let done = false;

  if (d3.select("g#centroids circle").attr("r") != 0) {
    done = true;

    for (let i = 0; i < centroids.length; i++) {
      if (oldcentroids[i].x != centroids[i].x) done = false;
      if (oldcentroids[i].y != centroids[i].y) done = false;
    }
  }

  if (done) {
    d3.select("h3#info").text("Algorithm converged. Click to restart.");
    d3.select("div#buttons")
      .select("input")
      .attr("hidden", "hidden");
  } else {
    // update centroids
    svg.select("#centroids")
      .selectAll("circle")
      .data(centroids)
      .transition()
      .duration(1000)
      .attr("r", "5")
      .attr("cx", d => xScale(d.x))
      .attr("cy", d => yScale(d.y));

    svg.select("g#plotarea")
      .select("#lines")
      .append("g")
      .selectAll("line")
      .data(oldcentroids)
      .enter()
      .append("line")
      .attr("x1", d => xScale(d.x))
      .attr("y1", d => yScale(d.y))
      .attr("x2", d => xScale(d.x))
      .attr("y2", d => yScale(d.y))
      .attr("stroke", d => colorScale(d.cluster))
      .data(centroids)
      .transition()
      .duration(1000)
      .attr("x2", d => xScale(d.x))
      .attr("y2", d => yScale(d.y));

    d3.select("div#buttons").select("input")
      .attr("value", "Reassign points")
      .attr("onclick", "reassign_points()");
  }
}

// ############ DIST ###############

// source: https://www.naftaliharris.com/blog/visualizing-k-means-clustering/

function dist(w, z) {
  return Math.sqrt(Math.pow(w.x - z.x, 2) + Math.pow(w.y - z.y, 2));
}

// ############ DISTSQUARED ###############

function distsquared(w, z) {
  return Math.pow(w.x - z.x, 2) + Math.pow(w.y - z.y, 2);
}


// ############ REASSIGN_POINTS ###############

// source: https://www.naftaliharris.com/blog/visualizing-k-means-clustering/
function reassign_points() {
  d3.select("h3#info").text("Click button to recalculate centroids.");

  const centroids = d3.select("#centroids")
    .selectAll("circle").data();

  for (let j = 0; j < data.length; j++) {
    let ibest = 0;
    let dbest = Infinity;
    for (let i = 0; i < centroids.length; i++) {
      const d = dist(data[j], centroids[i]);
      if (d < dbest) {
        dbest = d;
        ibest = i;
      }
    }
    data[j].cluster = ibest;
  }

  svg.selectAll("circle")
    .data(data)
    .style("fill", d => colorScale(d.cluster));

  d3.select("div#buttons").select("input")
    .attr("value", "Update centroids")
    .attr("onclick", "update_centroids()");
}


// ############ DOWNLOADSVG ###############
// need to add styling

function downloadSVG() {
  const svgData = new XMLSerializer().serializeToString(document.querySelector("div#plot > svg"));
  const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "chart.svg";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}


// ########### DOWNLOAD SVG ################

// https://observablehq.com/@jeremiak/download-data-button
// converted to non-obvervable javascript with chatgpt

function savedata() {
  const data = d3.selectAll("#plotarea > circle").data();
  const blob = new Blob([d3.csvFormat(data)], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = "data.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
