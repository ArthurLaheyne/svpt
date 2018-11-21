import React, { Component } from 'react';
import { ResponsiveLine } from '@nivo/line'
import { ResponsiveBar } from '@nivo/bar'

class Nivo extends Component {

  constructor(props) {
    super(props);
    // props.tournois
    let joueurs = [];
    this.props.tournois.forEach( tournoi => {
      tournoi.resultat.forEach( resultat => {
        let exists = joueurs.find( j => {
          return j === resultat.joueur;
        });
        if(!exists) {
          joueurs.push(resultat.joueur);
        }
      })
    });
    let data_gain = [];
    let data_roi = [];
    joueurs.forEach( joueur => {
      let data_joueur_gain = [];
      let data_joueur_roi = [];
      let gainBrutTotal= 0;
      let buyInTotal= 0;
      let i = 0;
      let tournois_joues = 0;
      this.props.tournois.forEach( tournoi => {
        i++;
        tournoi.resultat.forEach( resultat => {
          // console.log(resultat.joueur, joueur);
          if(resultat.joueur == joueur) {
            gainBrutTotal += resultat.gainBrut;
            buyInTotal += resultat.buyIn;
            tournois_joues ++;
            let gainNetTotal = gainBrutTotal - buyInTotal;
            let roi = Math.floor(gainNetTotal / buyInTotal * 100);
            data_joueur_gain.push({
              "x": i,
              "y": gainBrutTotal
            })
            data_joueur_roi.push({
              "x": i,
              "y": roi,
              "tournois_joues": tournois_joues
            })
          }
        });
      });
      data_gain.push({
        "id": joueur,
        // "color": "hsl(17, 70%, 50%)",
        "data": data_joueur_gain
      });
      data_roi.push({
        "id": joueur,
        // "color": "hsl(17, 70%, 50%)",
        "data": data_joueur_roi
      });
    });
    let data_roi_bar = data_roi.filter( joueur => {
      return joueur.data[joueur.data.length - 1].tournois_joues > 9;
    }).map( joueur => {
      let dernier_roi = joueur.data[joueur.data.length - 1].y;
      let tournois_joues = joueur.data[joueur.data.length - 1].tournois_joues;
      let pseudo = joueur.id;
      return {'pseudo': pseudo, 'roi': dernier_roi, 'tournois_joues': tournois_joues};
    })
    data_roi_bar.sort((joueur1, joueur2) => {
      return joueur1.roi < joueur2.roi;
    });
    console.log(data_roi_bar);
    this.state = {
      data_gain: data_gain,
      data_roi: data_roi,
      data_roi_bar: data_roi_bar,
    };
    console.log(data_roi_bar);
  }

  render() {
    return (
      <div>
        <div style={{width: '1000px', height: '600px'}}>
          <ResponsiveLine
            data={ this.state.data_gain }
            margin={{
                "top": 50,
                "right": 110,
                "bottom": 50,
                "left": 60
            }}
            xScale={{
                "type": "linear",
            }}
            yScale={{
                "type": "linear",
                "stacked": false,
                "min": "auto",
                "max": 200
            }}
            minY="auto"
            maxY="auto"
            stacked={true}
            axisBottom={{
                "orient": "bottom",
                "tickSize": 5,
                "tickPadding": 5,
                "tickRotation": 0,
                "legend": "transportation",
                "legendOffset": 36,
                "legendPosition": "center"
            }}
            axisLeft={{
                "orient": "left",
                "tickSize": 5,
                "tickPadding": 5,
                "tickRotation": 0,
                "legend": "count",
                "legendOffset": -40,
                "legendPosition": "center"
            }}
            curve="stepAfter"
            lineWidth={4}
            dotSize={10}
            dotColor="inherit:darker(0.3)"
            dotBorderWidth={2}
            dotBorderColor="#ffffff"
            enableDotLabel={false}
            enableDots={false}
            dotLabel="y"
            dotLabelYOffset={-12}
            enableArea={true}
            areaOpacity={0}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            legends={[
                {
                    "anchor": "bottom-right",
                    "direction": "column",
                    "justify": false,
                    "translateX": 100,
                    "translateY": 0,
                    "itemsSpacing": 0,
                    "itemDirection": "left-to-right",
                    "itemWidth": 80,
                    "itemHeight": 20,
                    "itemOpacity": 0.75,
                    "symbolSize": 12,
                    "symbolShape": "circle",
                    "symbolBorderColor": "rgba(0, 0, 0, .5)",
                    "effects": [
                        {
                            "on": "hover",
                            "style": {
                                "itemBackground": "rgba(0, 0, 0, .03)",
                                "itemOpacity": 1
                            }
                        }
                    ]
                }
            ]}
          />
        </div>
        <div style={{width: '1000px', height: '600px'}}>
          <ResponsiveLine
            data={ this.state.data_roi }
            margin={{
                "top": 50,
                "right": 110,
                "bottom": 50,
                "left": 60
            }}
            xScale={{
                "type": "linear",
            }}
            yScale={{
                "type": "linear",
                "stacked": false,
                "min": "auto",
                "max": 200
            }}
            minY="auto"
            maxY="auto"
            stacked={true}
            axisBottom={{
                "orient": "bottom",
                "tickSize": 5,
                "tickPadding": 5,
                "tickRotation": 0,
                "legend": "transportation",
                "legendOffset": 36,
                "legendPosition": "center"
            }}
            axisLeft={{
                "orient": "left",
                "tickSize": 5,
                "tickPadding": 5,
                "tickRotation": 0,
                "legend": "count",
                "legendOffset": -40,
                "legendPosition": "center"
            }}
            curve="stepAfter"
            lineWidth={4}
            dotSize={10}
            dotColor="inherit:darker(0.3)"
            dotBorderWidth={2}
            dotBorderColor="#ffffff"
            enableDotLabel={false}
            enableDots={false}
            dotLabel="y"
            dotLabelYOffset={-12}
            enableArea={true}
            areaOpacity={0}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            legends={[
                {
                    "anchor": "bottom-right",
                    "direction": "column",
                    "justify": false,
                    "translateX": 100,
                    "translateY": 0,
                    "itemsSpacing": 0,
                    "itemDirection": "left-to-right",
                    "itemWidth": 80,
                    "itemHeight": 20,
                    "itemOpacity": 0.75,
                    "symbolSize": 12,
                    "symbolShape": "circle",
                    "symbolBorderColor": "rgba(0, 0, 0, .5)",
                    "effects": [
                        {
                            "on": "hover",
                            "style": {
                                "itemBackground": "rgba(0, 0, 0, .03)",
                                "itemOpacity": 1
                            }
                        }
                    ]
                }
            ]}
          />
        </div>
        <div style={{width: '1000px', height: '600px'}}>
          <ResponsiveBar
            data={this.state.data_roi_bar}
            keys={[
            "roi"
            ]}
            indexBy="pseudo"
            margin={{
                "top": 50,
                "right": 130,
                "bottom": 50,
                "left": 60
            }}
            padding={0.3}
            groupMode="grouped"
            colors="category10"
            colorBy="index"
            defs={[
                {
                    "id": "dots",
                    "type": "patternDots",
                    "background": "inherit",
                    "color": "#38bcb2",
                    "size": 4,
                    "padding": 1,
                    "stagger": true
                },
                {
                    "id": "lines",
                    "type": "patternLines",
                    "background": "inherit",
                    "color": "#eed312",
                    "rotation": -45,
                    "lineWidth": 6,
                    "spacing": 10
                }
            ]}
            fill={[
                {
                    "match": {
                        "id": "fries"
                    },
                    "id": "dots"
                },
                {
                    "match": {
                        "id": "sandwich"
                    },
                    "id": "lines"
                }
            ]}
            borderColor="inherit:darker(1.6)"
            axisBottom={{
                "tickSize": 5,
                "tickPadding": 5,
                "tickRotation": 0,
                "legend": "pseudo",
                "legendPosition": "middle",
                "legendOffset": 32
            }}
            axisLeft={{
                "tickSize": 5,
                "tickPadding": 5,
                "tickRotation": 0,
                "legend": "ROI",
                "legendPosition": "middle",
                "legendOffset": -40
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor="inherit:darker(1.6)"
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            legends={[
              {
                "dataFrom": "keys",
                "anchor": "bottom-right",
                "direction": "column",
                "justify": false,
                "translateX": 120,
                "translateY": 0,
                "itemsSpacing": 2,
                "itemWidth": 100,
                "itemHeight": 20,
                "itemDirection": "left-to-right",
                "itemOpacity": 0.85,
                "symbolSize": 20,
                "effects": [
                  {
                    "on": "hover",
                    "style": {
                      "itemOpacity": 1
                    }
                  }
                ]
              }
            ]}
          />
        </div>
      </div>
    );
  }
}

export default Nivo;
