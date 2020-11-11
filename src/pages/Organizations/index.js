import React from "react";
import "@atlaskit/css-reset";
import "./style.css";
import TitleHeader from "../../atoms/TitleHeader";
import Textfield from "@atlaskit/textfield";
import SearchIcon from "@atlaskit/icon/glyph/search";
import "@atlaskit/css-reset";

export const Search = () => (
  <div style={{ marginLeft: "8px" }}>
    <SearchIcon primaryColor="gray" size="small" />
  </div>
);

export default function Organizations() {
  return (
    <div>
      <TitleHeader value="Organizations" />
      <div className="textfield">
        <Textfield
          placeholder="Search"
          name="basic"
          width="240"
          elemBeforeInput={<Search />}
        />
      </div>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>City</th>
              <th>State</th>
              <th>Zip</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="full-name-column">
                <a href="">2000 Spays and Neuters</a>
              </td>
              <td className="column">
                <p>111 West Middle River St. Desoto, TX 75115</p>
              </td>
              <td className="column">
                <p>New York</p>
              </td>
              <td className="column">
                <p>New York</p>
              </td>
              <td className="column">
                <p>10001</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
