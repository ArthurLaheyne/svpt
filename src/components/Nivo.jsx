import React, { Component } from 'react';
import { ResponsiveLine } from '@nivo/line'

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
      this.props.tournois.forEach( tournoi => {
        i++;
        tournoi.resultat.forEach( resultat => {
          // console.log(resultat.joueur, joueur);
          if(resultat.joueur == joueur) {
            gainBrutTotal += resultat.gainBrut;
            buyInTotal += resultat.buyIn;
            let gainNetTotal = gainBrutTotal - buyInTotal;
            let roi = Math.floor(gainNetTotal / buyInTotal * 100);
            data_joueur_gain.push({
              "x": i,
              "y": gainBrutTotal
            })
            data_joueur_roi.push({
              "x": i,
              "y": roi
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
    this.state = {
      data_gain: data_gain,
      data_roi: data_roi,
    };
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
      </div>
    );
  }
}

export default Nivo;
