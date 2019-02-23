import React, { Component } from "react";
import TableRow from "./TableRow";

class FlightTable extends Component {
  constructor(props) {
    super(props);
    this.sortHandler = this.sortHandler.bind(this);
    this.onMouseDownHandler = this.onMouseDownHandler.bind(this);
    // this.onContextMenuHandler = this.onContextMenuHandler.bind(this);
    this.onContextMenuHandlerTh = this.onContextMenuHandlerTh.bind(this);
  }

  sortHandler(item) {
    this.props.onSort(item);
  }

  // onContextMenuHandler(e) {
  //   this.props.handleRightClick(e);
  // }

  onMouseDownHandler(e) {
    this.props.handleClick(e);
  }

  onContextMenuHandlerTh(e, item) {
    this.props.handleRightClickTh(e, item);
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            {this.props.columns.map((item, i) => (
              <th
                id={item.includes(";") ? item.split(";")[0].trim() : item}
                key={i}
                className={item.includes(";") ? item.split(";")[1].trim() : ""}
                onClick={() => this.sortHandler(item)}
                onContextMenu={e => this.onContextMenuHandlerTh(e, item)}
                // style={{
                //   textAlign: i < 6 ? "left" : i < 12 ? "center" : "right"
                // }}
              >
                {item.includes(";") ? item.split(";")[0].trim() : item}
                <hr />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {this.props.content.map((i, ii) => (
            <TableRow
              key={"tr" + ii}
              id={ii}
              children={Object.keys(i).map((j, jj) =>
                jj < this.props.columns.length ? (
                  <td
                    id={`${ii}/${jj}`}
                    // onContextMenu={this.onContextMenuHandler}
                    onMouseDown={this.onMouseDownHandler}
                    key={jj}
                    className={
                      i[j] ? i[j].split(";")[i[j].split(";").length - 1] : ""
                    }
                  >
                    {i[j] ? i[j].split(";")[i[j].split(";").length - 2] : ""}
                  </td>
                ) : (
                  []
                )
              )}
            />
          ))}
        </tbody>
      </table>
    );
  }
}

export default FlightTable;

// export default function Thead(props) {
//   return (
//     <thead>
//       <tr>
//         {props.columns.map((item, i) => (
//           <th
//             key={i}
//             className={item.includes(";") ? item.split(";")[1].trim() : ""}
//             onClick={this.handler}
//           >
//             {item.includes(";") ? item.split(";")[0].trim() : item}
//             <hr />
//           </th>
//         ))}
//       </tr>
//     </thead>
//   );
// }
