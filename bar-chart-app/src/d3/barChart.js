import * as d3 from 'd3';

export function drawChart(id, data, yAxisTitle, onColumnClick = () => {}, onColumnUpdate = () => {}) {
    // set the margin
    const margin = {top: 20, right: 20, bottom: 30, left: 50};
    const width = 400 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    // set the ranges
    const x = d3.scaleBand().range([0, width]).padding(0.3);
    const y = d3.scaleLinear().range([height, 0]);

    // Scale the range of the data in the domains
    x.domain(data.map(d => d.x));
    y.domain([0, d3.max(data, data => data.y)])

    // create the SVG element
    const svg = d3.select(`svg#${id}`)
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // add the y Axis
    svg.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y));

    // add the Y gridlines
    svg.append("g")
        .attr("class", "grid")
        .call(d3.axisLeft(y)
            .ticks(10)
            .tickSize(-width)
            .tickFormat("")
            );

    // append the y axis title
    svg.append("text")
        .attr("class", "y-axis-title")
        .attr("transform", "rotate(-90)")
        .attr("y", 5)
        .attr("x", -50)
        .attr("dy", "1em")
        .text(yAxisTitle);

    // add the x Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .attr("class", "axis")
        .call(d3.axisBottom(x));

    // create the brush
    const brush = d3.brushY()
            .extent(d => [[x(d.x), 0], 
                            [x(d.x) + x.bandwidth(), height]])
            .on("brush", brushMove)
            .on("end", brushEnd)

    // append the brushes for the bar chart
    const brushNodes = svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("g")
            .attr("class", "brush bar")
        .append("g")
            .call(brush)
            .call(brush.move, d => [d.y, 0].map(y))
            .classed("selected", d => d.selected)
            .on("click", d => onColumnClick(d))

    function brushMove(datum) {
        if (!d3.event.sourceEvent) return; 
        if (d3.event.sourceEvent.type === "brush") return;
        if (!d3.event.selection) return;
        
        const [newY,] = d3.event.selection.map(y.invert)
        brushNodes.call(brush.move, d => d.x === datum.x ?
                                        [newY, 0].map(y) :
                                        [d.y, 0].map(y));
    }

    function brushEnd(datum) {
        if (!d3.event.sourceEvent) return; 
        if (d3.event.sourceEvent.type === "brush") return;
        if (!d3.event.selection) {
            brushNodes.call(brush.move, d => [d.y, 0].map(y));
        } else {
            const [newY,] = d3.event.selection.map(y.invert);
            if (newY !== datum.y) {
                onColumnUpdate(datum, newY);
            }
        }
    }

    return {
        svg,
        brushNodes,
        brush,
        height,
        width,
        x,
        y,
    }
}

export function updateBars(id, data, chartRefs) {
    if (Object.keys(chartRefs).length === 0) return;

    const {
      brushNodes,
      brush,
      y,
    } = chartRefs;

    d3.selectAll(`#${id} .bar`)
      .data(data)
      .classed("selected", d => d.selected)

    brushNodes
      .data(data)
      .call(brush.move, d => [d.y, 0].map(y));
}
