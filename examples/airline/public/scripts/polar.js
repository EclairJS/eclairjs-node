function PolarChart(options) {
    this.options = options || {};
}

PolarChart.prototype.create = function(airportCode) {
    this.uid = airportCode;
    var node = $('#'+this.uid+'_chart')[0];
    this.tooltip = new Tooltip({id:'charttooltip_'+airportCode});

    var width = this.options.width || 225,
        height = this.options.height || 225,
        radius = this.radius = Math.min(width, height) / 2 - 30;

    var r = d3.scale.linear()
        .domain([0, .5])
        .range([0, radius]);

    var svg = this.svg = d3.select(node).append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var gr = svg.append("g")
        .attr("class", "r axis")
      .selectAll("g")
        .data(r.ticks(4).slice(2))
      .enter().append("g");

    gr.append("circle")
        .attr("r", r);

    var ga = svg.append("g")
        .attr("class", "a axis")
      .selectAll("g")
        .data(d3.range(0, 36, 3))
      .enter().append("g")
        .attr("transform", function(d) { return "rotate(" + (d < 9 ? d+27 : d-9)*10 + ")"; });

    ga.append("line")
        .attr("x2", radius);

    ga.append("text")
        .attr("x", radius + 6)
        .attr("dy", ".35em")
        .style("text-anchor", function(d) { return d > 15 ? "end" : null; })
        .attr("transform", function(d) { 
            var degree = d === 0 ? 90 : d === 18 ? 270 : 180; 
            return d > 15 || d === 0 ? "rotate("+degree+" " + (radius + 6) + ",0)" : null; 
        })
        .text(function(d) {
            switch (d) {
                case 0:
                    return "N";
                case 9:
                    return "E";
                case 18:
                    return "S";
                case 27:
                    return "W";
                default:
                    return d + "°";
            } 
        })

    this.chartOptions = new PolarChartOptions(airportCode);
}

PolarChart.prototype.setChartData = function(data) {

    chartdata = data || [];
    //console.log('set chartdata: ',chartdata);
    //console.log('this.radius: ',this.radius);

    var numSegments = 12,
        innerRadius = 5,
        segmentHeight = radius = this.radius;

    var ir = function(d, i) {
        //console.log('ir d: ',d);
        var percent = (d.ontime || d.delay_minor || d.delay_major)/100;
        var offset = d.delay_major && d.delay_major != 100 ? radius-innerRadius-(segmentHeight*percent) :
            d.delay_minor ? (segmentHeight-innerRadius)*(chartdata[i-1].ontime/100) : 0; 
        return innerRadius + offset + 
            Math.floor(d.region/numSegments) * Math.floor(segmentHeight*percent);
    }

    var or = function(d,i) {
        var percent = (d.ontime || d.delay_minor || d.delay_major)/100;
        var offset = d.delay_major ? radius-innerRadius-(segmentHeight*percent) :
            d.delay_minor && chartdata[i+1].delay_major === 0 ? radius-innerRadius-(segmentHeight*percent) :
            d.delay_minor ? (segmentHeight-innerRadius)*(chartdata[i-1].ontime/100) :
            d.ontime && d.ontime === 100 ? radius-innerRadius-(segmentHeight*percent) : 0;
        return innerRadius + offset + Math.floor(segmentHeight*percent) +
            Math.floor(d.region/numSegments) * Math.floor(segmentHeight*percent);
    }

    var color = function(d) {
        var red = '#E61616',
            green = '#43BF43',
            yellow = '#FFFF19';

        return d.ontime ? green : d.delay_minor ? yellow : red;
    }

    var me = this;
    var showTooltip = function(d) {
        var percent = d.ontime || d.delay_minor || d.delay_major,
            status = d.ontime ? 'on-time' : d.delay_minor ? 'minor delay' : 'major delay',
            text = status+ '<br/>' + percent + "% ";

        d3.select(this).transition()
            .attr("opacity", ".5");

        me.tooltip.show(text);
    }

    // Remove any old pie slices first.
    this.svg.selectAll("path").remove();

    this.svg.selectAll("path").data(chartdata)
        .enter().append("path")
            .attr("d", d3.svg.arc()
            .innerRadius(ir)
            .outerRadius(or)
            .startAngle(function(d,i){return ((d.region + .02) * 2 * Math.PI) / numSegments;})
            .endAngle(function(d,i){return ((d.region + .98) * 2 * Math.PI) / numSegments;}))
            .attr("fill", color)
            .attr("opacity", ".9")
            .on('mouseover', showTooltip) 
            .on("mouseout", function(d) {       
                me.tooltip.hide();
                d3.select(this).transition().attr("opacity", ".9");
            });
}

PolarChart.prototype.setCarrierOptions = function(carriers) {
    this.chartOptions.setCarriers(carriers);
}

PolarChart.prototype.setFlightnumOptions = function(flightnums) {
    this.chartOptions.setFlightnums(flightnums);
}

PolarChart.prototype.clearFlightnumOptions = function() {
    this.chartOptions.clearFlightnums();
}

PolarChart.prototype.showOptions = function() {
    this.chartOptions.show();
}

PolarChart.prototype.hideOptions = function(callback) {
    this.chartOptions.hide(callback);
}

PolarChart.prototype.getDelayRange = function() {
    return this.chartOptions.getDelayRange();
}


function PolarChartOptions(airportCode) {
    this.uid = airportCode;
    this.chartid = this.uid+'_chart';
    this.optsid = this.uid+'_options';
    this.showid = this.uid+'_showopts';
    this.hideid = this.uid+'_hideopts';

    this.options = {
        delay_range: [10, 45],
        airline_code: '',
        flight_num: 0
    };

    var node = $('#'+this.uid+'_options')[0];
    $(node).append("<span>What do you consider a minor delay (mins)?: </span>")
           .append("<input type='text' id='"+this.uid+"_delay' class='delay-text' readonly />")
           .append("<div id='"+this.uid+"_delay_slider'></div>")
           .append("<label class='polar_main'>To see activity at your destination airport " + 
                " select from today's scheduled flights.</label><br/>")
           .append("<label for='airline_code'>Select your airline carrier:</label><br/>")
           .append("<select id='"+this.uid+"_airline_code' name='airline-code' /></select><br/>")
           .append("<label for='flight_num'>Select your flight number:</label><br/>")
           .append("<select id='"+this.uid+"_flight_num' name='flight_num' /></select>");

    $('#'+this.uid+'_airline_code').selectmenu();
    $('#'+this.uid+'_airline_code').selectmenu('option',{width: 72});

    $('#'+this.uid+'_flight_num').selectmenu();
    $('#'+this.uid+'_flight_num').selectmenu('option',{width: 154});
}

PolarChartOptions.prototype.setCarriers = function(options) {
    var carriers = options && options.carriers ? options.carriers : [];
    var carrierSelectCallback = options && options.carrierSelectCallback ? options.carrierSelectCallback : null;

    var me = this;
    var carrieropts = [];
    $.each(carriers, function(i, option) {
        carrieropts[i] = "<option value='" + option.carrier + "'>" + option.carrier + "</option>";
    });
    $('#'+this.uid+'_airline_code').append(carrieropts.join(''));
    $('#'+this.uid+'_airline_code').on("selectmenuselect", function(event,ui) {
        //console.log('GETFLIGHTNUMS NOTHING PENDING: ',ui.item.value);
        this.getFlightnumsPending = true;
        me.options.airline_code = ui.item.value;
        //console.log('carrier selected: ',ui.item.value);
        // Clear the flightnum list since the user has selected a new carrier.
        if (carrierSelectCallback) {
            carrierSelectCallback(me.uid, ui.item.value);
        }
    });
}

PolarChartOptions.prototype.clearFlightnums = function() {
    $('#'+this.uid+'_flight_num').empty();
    $('#'+this.uid+'_flight_num').append("<option value='placeholder'>--</option>");
    $('#'+this.uid+'_flight_num').selectmenu('refresh');
}

PolarChartOptions.prototype.setFlightnums = function(options) {
    var flightnums = options && options.flightnums ? options.flightnums : [];
    var flightnumSelectCallback = options && options.flightnumSelectCallback ? options.flightnumSelectCallback : null;

    //console.log('setFlightnums: ',flightnums);
    var me = this;
    var flightopts = [];
    $.each(flightnums, function(i, option) {
        flightopts.push("<option value='" + JSON.stringify(option) + "'>" + option.flight_num + "</option>");
    });
    //console.log('flightopts: ',flightopts);
    $('#'+this.uid+'_flight_num').empty();
    $('#'+this.uid+'_flight_num').append("<option value='placeholder'>--Select Flight--</option>");
    $('#'+me.uid+'_flight_num').append(flightopts.join(''));
    $('#'+me.uid+'_flight_num').selectmenu('refresh');
    $('#'+me.uid+'_flight_num').on("selectmenuselect", function(event,ui) {
        me.options.flight_num = ui.item.value;
        //console.log('flight selected: ',JSON.parse(ui.item.value));
        if (ui.item.value !== 'placeholder') {
            flightnumSelectCallback(JSON.parse(ui.item.value));
        }
    });
}

PolarChartOptions.prototype.show = function() {
    $('#'+this.chartid).css('display', 'none');
    $('#'+this.optsid).css('display', 'block');
    $('#'+this.showid).css('display', 'none');
    $('#'+this.hideid).css('display', 'block');
    var me = this;
    $('#'+this.uid+'_delay_slider').slider({
        range: true,
        min: 0,
        max: 240,
        values: this.options.delay_range,
        orientation: "horizontal",
        slide: function(event, ui) {
            $('#'+me.uid+'_delay').val(ui.values[0] + " - " + ui.values[1]);
        }
    });
    $('#'+this.uid+'_delay').val($('#'+this.uid+'_delay_slider').slider('values', 0) 
        + ' - ' + $('#'+this.uid+'_delay_slider').slider('values', 1));
}

PolarChartOptions.prototype.hide = function(callback) {
    $.extend(this.options, {
        delay_range: $('#'+this.uid+'_delay_slider').slider('values')
    });
    //console.log(this.uid, ' new options: ',this.options);
    $('#'+this.chartid).css('display', 'block');
    $('#'+this.optsid).css('display', 'none');
    $('#'+this.showid).css('display', 'block');
    $('#'+this.hideid).css('display', 'none');

    callback(this.options);
}

PolarChartOptions.prototype.getDelayRange = function() {
    return this.options.delay_range;
}

PolarChartOptions.prototype.getCarrier = function() {
    return this.options.carrier;
}

PolarChartOptions.prototype.getFlightNum = function() {
    return this.flight_num;
}


