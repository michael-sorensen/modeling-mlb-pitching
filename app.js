file = "player_data.json"
    // ADDING NAMES TO DROPDOWN
d3.json(file).then(function(data) {
    data.forEach(d => {
        var name = d.name;
        d3.select("#selector").append("option").text(name);
    });
});
prospectFile = "prospects.json"
d3.json(prospectFile).then(function(data) {
    data.forEach(d => {
        var name = d.name;
        d3.select("#selector2").append("option").text(name);
    });
});
d3.selectAll("#selector").on("change", updatePlot);
var colors = ['#0C2340', '#C81D25', '#9CBDBF', 'F18F01'];

// SET DEFAULT PLAYER PLOTS
function plotting() {
    d3.json(file).then(function(data) {
        defaultPlayer = data[0];
        var pctFastball = defaultPlayer.n_fastball_formatted;
        var pctOffspeed = defaultPlayer.n_offspeed_formatted;
        var pctBreaking = defaultPlayer.n_breaking_formatted;
        var groundballs = defaultPlayer.groundballs_percent;
        var flyballs = defaultPlayer.flyballs_percent;
        var linedrives = defaultPlayer.linedrives_percent;
        var popups = defaultPlayer.popups_percent;
        var contact = [groundballs, flyballs, linedrives, popups];
        var pitches = [pctFastball, pctOffspeed, pctBreaking];



        // ADD RESPONSIVE CONFIG FOR PLOTS
        var config = { responsive: true };

        // PITCHES PIE CHART
        var pitchesData = [{
            values: [pitches],
            labels: ['Fastball', 'Offspeed', 'Breaking'],
            type: 'pie',
            marker: {
                colors: colors
            },
            textposition: "inside",
            textfont: {
                family: 'Cairo, sans-serif',
                size: 15,
                color: 'white',
            }
        }];

        var pitchesLayout = {
            autosize: true,
            showlegend: true,
            legend: {
                x: .1,
                xanchor: 'right',
                y: .5,
                font: {
                    family: 'Cairo, sans-serif',
                    size: 13
                },
                bgcolor: '#F3F7F7',
                bordercolor: '#0C2340',
                borderwidth: 2,
            },
            margin: {
                l: 30,
                r: 30,
                b: 10,
                t: 10,
                pad: 4
            }
        };

        Plotly.newPlot('pie', pitchesData, pitchesLayout, config);


        // CONTACT PIE CHART
        var contactData = [{
            values: [contact],
            labels: ['Ground Balls', 'Fly Balls', 'Line Drives', 'Popups'],
            type: 'pie',
            marker: {
                colors: colors
            }
        }];

        var contactLayout = {
            autosize: true,
            showlegend: true,
            legend: {
                x: .1,
                xanchor: 'right',
                y: .5,
                font: {
                    family: 'Cairo, sans-serif',
                    size: 13
                },
                bgcolor: '#F3F7F7',
                bordercolor: '#0C2340',
                borderwidth: 2,
            },
            margin: {
                l: 30,
                r: 30,
                b: 10,
                t: 10,
                pad: 4
            }
        };

        Plotly.newPlot('pie2', contactData, contactLayout, config);

        d3.select("#data").html(`
        <div class="card">
        <div class="card-header-red">Predicted ERA</div>
        <h5 class="card-data">${defaultPlayer.predicted_era.toFixed(2)}</h5>
        </div>
        <div class="card">
        <div class="card-header-red">Predicted Outs</div>
        <h5 class="card-data">${defaultPlayer.predicted_outs.toFixed()}</h5>
        </div>`);

        d3.select("#data-top").html(`
        <div class="row">
                <div class="col-md-3">
                <div class="card">
                <div class="card-header-dark">Age</div>
                <h5 class="card-data">${defaultPlayer.player_age}</h5>
                </div>
                </div>
        
                <div class="col-md-3">
                <div class="card">
                <div class="card-header-dark">Games</div>
                <h5 class="card-data">${defaultPlayer.p_game}</h5>
                </div>
                </div>
                
                <div class="col-md-3">
                <div class="card">
                <div class="card-header-dark">Innings</div>
                <h5 class="card-data">${defaultPlayer.p_formatted_ip}</h5>
                </div>
                </div>
                
                <div class="col-md-3">
                <div class="card">
                <div class="card-header-dark">ERA</div>
                <h5 class="card-data">${defaultPlayer.p_era}</h5>
                </div>
                </div>
                </div>
                `);



    });
};

plotting();

function updatePlot() {
    d3.json(file).then(function(data) {
        var dropDown = d3.select("#selector");
        var selection = dropDown.property("value");
        var updatedPlayer = data.find(data => data.name == selection);
        console.log(updatedPlayer);
        var fastballUpdate = updatedPlayer.n_fastball_formatted;
        var offspeedUpdate = updatedPlayer.n_offspeed_formatted;
        var breakingUpdate = updatedPlayer.n_breaking_formatted;
        var groundballsUpdate = updatedPlayer.groundballs_percent;
        var flyballsUpdate = updatedPlayer.flyballs_percent;
        var linedrivesUpdate = updatedPlayer.linedrives_percent;
        var popupsUpdate = updatedPlayer.popups_percent;

        pitchUpdates = [fastballUpdate, offspeedUpdate, breakingUpdate];
        contactUpdates = [groundballsUpdate, flyballsUpdate, linedrivesUpdate, popupsUpdate];


        // RESTYLE PLOTS WITH NEW DATA
        Plotly.restyle('pie', 'values', [pitchUpdates]);
        Plotly.restyle('pie2', 'values', [contactUpdates]);

        // UPDATE SIDEBAR SECTION WITH NEW DEMOGRAPHIC DATA

        d3.select("#data").html(`
        <div class="row">
        <div class="card">
        <div class="card-header-red">Predicted ERA</div>
        <h5 class="card-data">${updatedPlayer.predicted_era.toFixed(2)}</h5>
        </div>
        </div>
        <div class="row">
        <div class="card">
        <div class="card-header-red">Predicted Outs</div>
        <h5 class="card-data">${updatedPlayer.predicted_outs.toFixed()}</h5>
        </div>
        </div>`);

        d3.select("#data").html(`
        <div class="card">
        <div class="card-header-red">Predicted ERA</div>
        <h5 class="card-data">${updatedPlayer.predicted_era.toFixed(2)}</h5>
        </div>
        <div class="card">
        <div class="card-header-red">Predicted Outs</div>
        <h5 class="card-data">${updatedPlayer.predicted_outs.toFixed()}</h5>
        </div>`);

        d3.select("#data-top").html(`
        <div class="row">
                <div class="col-md-3">
                <div class="card">
                <div class="card-header-dark">Age</div>
                <h5 class="card-data">${updatedPlayer.player_age}</h5>
                </div>
                </div>
        
                <div class="col-md-3">
                <div class="card">
                <div class="card-header-dark">Games</div>
                <h5 class="card-data">${updatedPlayer.p_game}</h5>
                </div>
                </div>
                
                <div class="col-md-3">
                <div class="card">
                <div class="card-header-dark">Innings</div>
                <h5 class="card-data">${updatedPlayer.p_formatted_ip}</h5>
                </div>
                </div>
                
                <div class="col-md-3">
                <div class="card">
                <div class="card-header-dark">ERA</div>
                <h5 class="card-data">${updatedPlayer.p_era}</h5>
                </div>
                </div>
                </div>
                `);
    });
};

d3.selectAll("#selector").on("change", updatePlot);



/*---------------------------------------*/



// SET DEFAULT PROSPECT PLOTS
function prospectPlotting() {
    d3.json(prospectFile).then(function(data) {
        defaultProspectPlayer = data[0];
        var pctProspectFastball = defaultProspectPlayer.n_fastball_formatted;
        var pctProspectOffspeed = defaultProspectPlayer.n_offspeed_formatted;
        var pctProspectBreaking = defaultProspectPlayer.n_breaking_formatted;
        var prospectGroundballs = defaultProspectPlayer.groundballs_percent;
        var prospectFlyballs = defaultProspectPlayer.flyballs_percent;
        var prospectLinedrives = defaultProspectPlayer.linedrives_percent;
        var prospectPopups = defaultProspectPlayer.popups_percent;
        var prospectContact = [prospectGroundballs, prospectFlyballs, prospectLinedrives, prospectPopups];
        var prospectPitches = [pctProspectFastball, pctProspectOffspeed, pctProspectBreaking];


        // ADD RESPONSIVE CONFIG FOR PLOTS
        var config = { responsive: true };

        // PITCHES PIE CHART
        var prospectPitchesData = [{
            values: [prospectPitches],
            labels: ['Fastball', 'Offspeed', 'Breaking'],
            type: 'pie',
            marker: {
                colors: colors
            },
            textposition: "inside",
            textfont: {
                family: 'Cairo, sans-serif',
                size: 15,
                color: 'white',
            }
        }];

        var prospectLayout = {
            autosize: true,
            showlegend: true,
            legend: {
                x: .1,
                xanchor: 'right',
                y: .5,
                font: {
                    family: 'Cairo, sans-serif',
                    size: 13
                },
                bgcolor: '#F3F7F7',
                bordercolor: '#0C2340',
                borderwidth: 2,
            },
            margin: {
                l: 30,
                r: 30,
                b: 10,
                t: 10,
                pad: 4
            }
        };

        Plotly.newPlot('prospectPie', prospectPitchesData, prospectLayout, config);

        // CONTACT PIE CHART
        var prospectContactData = [{
            values: [prospectContact],
            labels: ['Ground Balls', 'Fly Balls', 'Line Drives', 'Popups'],
            type: 'pie',
            marker: {
                colors: colors
            },
            textposition: "inside",
            textfont: {
                family: 'Cairo, sans-serif',
                size: 15,
                color: 'white',
            }
        }];
        Plotly.newPlot('prospectPie2', prospectContactData, prospectLayout, config);

        d3.select("#data2").html(`
        <div class="card">
        <div class="card-header-red">Predicted ERA</div>
        <h5 class="card-data">${defaultProspectPlayer.predicted_era.toFixed(2)}</h5>
        </div>
        <div class="card">
        <div class="card-header-red">Predicted Outs</div>
        <h5 class="card-data">${defaultProspectPlayer.predicted_outs.toFixed()}</h5>
        </div>
        <div class="card">
        <div class="card-header-gray">MLB Equivalent</div>
        <h5 class="card-data-text">${defaultProspectPlayer.mlb_compare}</h5>
        </div>`);

        d3.select("#data-top2").html(`
        <div class="row">
                <div class="col-md-3">
                <div class="card">
                <div class="card-header-dark">Age</div>
                <h5 class="card-data">${defaultProspectPlayer.player_age}</h5>
                </div>
                </div>
        
                <div class="col-md-3">
                <div class="card">
                <div class="card-header-dark">Games</div>
                <h5 class="card-data">${defaultProspectPlayer.p_game}</h5>
                </div>
                </div>
                
                <div class="col-md-3">
                <div class="card">
                <div class="card-header-dark">Innings</div>
                <h5 class="card-data">${defaultProspectPlayer.p_formatted_ip}</h5>
                </div>
                </div>
                
                <div class="col-md-3">
                <div class="card">
                <div class="card-header-dark">ERA</div>
                <h5 class="card-data">${defaultProspectPlayer.p_era}</h5>
                </div>
                </div>
                </div>
                `);

    });
};

prospectPlotting();


function updatePlot2() {
    d3.json(prospectFile).then(function(data) {
        var dropDown2 = d3.select("#selector2");
        var selection = dropDown2.property("value");
        var updatedProspectPlayer = data.find(data => data.name === selection);
        console.log(updatedProspectPlayer);
        var fastballUpdate = updatedProspectPlayer.n_fastball_formatted;
        var offspeedUpdate = updatedProspectPlayer.n_offspeed_formatted;
        var breakingUpdate = updatedProspectPlayer.n_breaking_formatted;


        var groundballsUpdate = updatedProspectPlayer.groundballs_percent;
        var flyballsUpdate = updatedProspectPlayer.flyballs_percent;
        var linedrivesUpdate = updatedProspectPlayer.linedrives_percent;
        var popupsUpdate = updatedProspectPlayer.popups_percent;

        pitchUpdates = [fastballUpdate, offspeedUpdate, breakingUpdate];
        contactUpdates = [groundballsUpdate, flyballsUpdate, linedrivesUpdate, popupsUpdate];


        // RESTYLE PLOTS WITH NEW DATA
        Plotly.restyle('prospectPie', 'values', [pitchUpdates]);
        Plotly.restyle('prospectPie2', 'values', [contactUpdates]);

        // UPDATE SIDEBAR SECTION WITH NEW DEMOGRAPHIC DATA

        d3.select("#data2").html(`
        <div class="card">
        <div class="card-header-red">Predicted ERA</div>
        <h5 class="card-data">${updatedProspectPlayer.predicted_era.toFixed(2)}</h5>
        </div>
        <div class="card">
        <div class="card-header-red">Predicted Outs</div>
        <h5 class="card-data">${updatedProspectPlayer.predicted_outs.toFixed()}</h5>
        </div>
        <div class="card">
        <div class="card-header-gray">MLB Equivalent</div>
        <h5 class="card-data-text">${updatedProspectPlayer.mlb_compare}</h5>
        </div>`);

        d3.select("#data-top2").html(`
        <div class="row">
                <div class="col-md-3">
                <div class="card">
                <div class="card-header-dark">Age</div>
                <h5 class="card-data">${updatedProspectPlayer.player_age}</h5>
                </div>
                </div>
        
                <div class="col-md-3">
                <div class="card">
                <div class="card-header-dark">Games</div>
                <h5 class="card-data">${updatedProspectPlayer.p_game}</h5>
                </div>
                </div>
                
                <div class="col-md-3">
                <div class="card">
                <div class="card-header-dark">Innings</div>
                <h5 class="card-data">${updatedProspectPlayer.p_formatted_ip}</h5>
                </div>
                </div>
                
                <div class="col-md-3">
                <div class="card">
                <div class="card-header-dark">ERA</div>
                <h5 class="card-data">${updatedProspectPlayer.p_era}</h5>
                </div>
                </div>
                </div>
                `);
    });
};

d3.selectAll("#selector2").on("change", updatePlot2);



/*eras = [];
fbs = [];
data.forEach(function(d) {
    eras.push(d.p_k_percent);
    fbs.push(d.p_era);
    var allData = [{
        x: fbs,
        y: eras,
        type: 'scatter',
        mode: 'markers'
    }];

    var layout = { autosize: true };
    Plotly.newPlot('scatter', allData, layout);
});*/