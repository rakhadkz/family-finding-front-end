import OrgChart from "@balkangraph/orgchart.js";
import React, { Component } from "react";
import { removeChildContactRequest } from "../../../../api/childContact";
import {
  createChildContact,
  updateChildContact
} from "../../../../context/children/childProvider";
import { EditNodeForm } from "./EditNodeForm";
import "./my-node.css";

class Chart extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.divRef = React.createRef();
    this.state = {
      childId: props.childId,
    };
  }

  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    const { childId } = this.state;

    var editForm = function () {
      this.nodeId = null;
    };

    editForm.prototype.init = function (obj) {
      var that = this;
      this.obj = obj;
      this.editForm = document.getElementById("editForm");
      this.contactInput = document.getElementById("contact");
      this.titleInput = document.getElementById("title");
      this.cancelButton = document.getElementById("cancel");
      this.saveButton = document.getElementById("save");

      this.cancelButton.addEventListener("click", function () {
        that.hide();
      });

      this.saveButton.addEventListener("click", function () {
        setTimeout(() => {
          const contact = JSON.parse(localStorage.getItem("selectValue"));
          var node = chart.get(that.nodeId);
          node.Name = contact.label;
          node.Relationship = that.titleInput.value;

          updateChildContact(
            {
              child_contact: {
                contact_id: contact.value,
                relationship: node.Relationship,
              },
            },
            that.nodeId
          );
          chart.updateNode(node);
          that.hide();
        }, 500);
      });
    };

    editForm.prototype.show = function (nodeId) {
      this.hide();
      this.nodeId = nodeId;

      this.editForm.style.display = "block";
      var node = chart.get(nodeId);
      this.titleInput.value = node.Relationship;
    };

    editForm.prototype.hide = function (showldUpdateTheNode) {
      this.editForm.style.display = "none";
    };

    OrgChart.templates.myTemplate = Object.assign({}, OrgChart.templates.ana);
    OrgChart.templates.myTemplate = Object.assign({}, OrgChart.templates.ana);
    OrgChart.templates.myTemplate.size = [180, 40];
    OrgChart.templates.myTemplate.node =
      '<rect class="yellow-node" x="0" y="0" height="40" width="180" fill="#039BE5" stroke-width="0" stroke="#aeaeae" rx="20" ry="20"></rect>';

    OrgChart.templates.myTemplate.ripple = {
      radius: 1,
      color: "#0890D3",
      rect: null,
    };

    OrgChart.templates.myTemplate.plus =
      '<rect x="0" y="0" width="0" height="0" rx="5" ry="5" fill="#2E2E2E" stroke="#aeaeae" stroke-width="0"></rect>' +
      '<line x1="0" y1="5" x2="5" y2="5" stroke-width="0" stroke="#aeaeae"></line>' +
      '<line x1="0" y1="5" x2="5" y2="5" stroke-width="0" stroke="#aeaeae"></line>';

    OrgChart.templates.myTemplate.minus =
      '<rect x="0" y="0" width="0" height="0" rx="5" ry="5" fill="#2E2E2E" stroke="#aeaeae" stroke-width="0"></rect>' +
      '<line x1="4" y1="5" x2="5" y2="5" stroke-width="0" stroke="#aeaeae"></line>';

    OrgChart.templates.myTemplate.expandCollapseSize = 0;

    OrgChart.templates.myTemplate.field_0 =
      '<text width="150" class="field_0" style="font-size: 14px;" fill="#172B4D" x="48" y="15" text-anchor="start">{val}</text>';
    OrgChart.templates.myTemplate.field_1 =
      '<text width="150" class="field_1" style="font-size: 12px;" fill="#6B778C" x="48" y="33" text-anchor="start">{val}</text>';

    OrgChart.templates.myTemplate.nodeMenuButton =
      '<g style="cursor:pointer;" transform="matrix(1,0,0,1,170,13)" control-node-menu-id="{id}"><rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="15" height="15"></rect><circle cx="0" cy="0" r="2" fill="#ffffff"></circle><circle cx="0" cy="6" r="2" fill="#ffffff"></circle><circle cx="0" cy="12" r="2" fill="#ffffff"></circle></g>';

    OrgChart.templates.green = Object.assign({}, OrgChart.templates.myTemplate);
    OrgChart.templates.green.node =
      '<rect class="yellow-node" x="0" y="0" height="40" width="180" fill="#CCEFFF" stroke-width="0" stroke="#aeaeae" rx="20" ry="20"></rect>';
    OrgChart.templates.yellow = Object.assign(
      {},
      OrgChart.templates.myTemplate
    );
    OrgChart.templates.yellow.node =
      '<rect class="yellow-node" x="0" y="0" height="40" width="180" fill="#CEE9E9" stroke-width="0" stroke="#aeaeae" rx="20" ry="20"></rect>';
    OrgChart.templates.yellow.field_0 =
      '<text width="150" class="field_0" style="font-size: 14px;" fill="#172B4D" x="48" y="15" text-anchor="start">{val}</text>';
    OrgChart.templates.yellow.field_1 =
      '<text width="150" class="field_1" style="font-size: 12px;" fill="#6B778C" x="48" y="33" text-anchor="start">{val}</text>';

    OrgChart.templates.yellow.img_0 =
      '<clipPath id="ulaImg">' +
      '<circle cx="20" cy="20" r="20"></circle>' +
      "</clipPath>" +
      '<image preserveAspectRatio="xMidYMid slice" clip-path="url(#ulaImg)" xlink:href="{val}" x="0" y="0" width="40" height="40">' +
      "</image>";

    OrgChart.templates.green.img_0 =
      '<clipPath id="ulaImg">' +
      '<circle cx="20" cy="20" r="20"></circle>' +
      "</clipPath>" +
      '<image preserveAspectRatio="xMidYMid slice" clip-path="url(#ulaImg)" xlink:href="{val}" x="0" y="0" width="40" height="40">' +
      "</image>";

    OrgChart.templates.yellow.nodeMenuButton =
      '<g style="cursor:pointer;" transform="matrix(1,0,0,1,170,13)" control-node-menu-id="{id}"><rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="15" height="15"></rect><circle cx="0" cy="0" r="2" fill="#ffffff"></circle><circle cx="0" cy="6" r="2" fill="#ffffff"></circle><circle cx="0" cy="12" r="2" fill="#ffffff"></circle></g>';

    const chart = new OrgChart(this.divRef.current, {
      nodes: this.props.nodes,
      editUI: new editForm(),
      template: "myTemplate",
      toolbar: {
        layout: true,
        zoom: true,
        fit: true,
        expandAll: true,
      },
      tags: {
        child: {
          template: "yellow",
        },
        relatives: {
          template: "green",
        },
      },
      nodeMenu: {
        edit: {
          text: "Edit Contact Node",
        },
        add: {
          text: "Add",
        },
        remove: {
          text: "Remove",
        },
      },
      nodeBinding: {
        field_0: "Name",
        field_1: "Relationship",
        img_0: "Avatar",
      },
      menu: {
        pdf: {
          text: "Export PDF",
        },
        png: {
          text: "Export PNG",
        },
        svg: {
          text: "Export SVG",
        },
        csv: {
          text: "Export CSV",
        },
      },
    });

    chart.on("update", function (sender, oldNode, newNode) {
      console.log(sender, oldNode, newNode);
      updateChildContact(
        {
          child_contact: {
            relationship: newNode.Relationship,
            parent_id: newNode.pid,
          },
        },
        newNode.id
      );
    });

    chart.on("add", function (sender, node) {
      console.log(sender, node, childId);
      createChildContact({
        child_contact: { child_id: childId, parent_id: node.pid },
      });
    });

    chart.on("remove", function (sender, nodeId, newIds) {
      console.log(nodeId, newIds);
      Object.keys(newIds.newPidsForIds).map((id) =>
        updateChildContact(
          { child_contact: { parent_id: newIds.newPidsForIds[id] } },
          id
        )
      );

      removeChildContactRequest(nodeId);
    });

    this.chart = chart;
  }

  render() {
    return (
      <>
        <div id="tree" style={{ height: 400 }} ref={this.divRef}></div>
        <EditNodeForm />
      </>
    );
  }
}

export default Chart;
