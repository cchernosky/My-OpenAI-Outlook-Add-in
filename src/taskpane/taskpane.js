/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global document, Office */

import { runCompletion } from "../../index.js";
var body = "";

// Called when the task bar button is pressed
Office.onReady((info) => {
  if (info.host === Office.HostType.Outlook) {
    document.getElementById("sideload-msg").style.display = "none";
    document.getElementById("app-body").style.display = "flex";
    document.getElementById("run").onclick = run;

    toggleJumpingDots("hide");

    // Pre-hydrate data structures
    Office.context.mailbox.item.body.getAsync(Office.CoercionType.Text, (asyncResult) => {
      if (asyncResult.status === Office.AsyncResultStatus.Succeeded) {
        setBody(asyncResult.value);
      }
    });
  }
});

export async function run() {
  const item = Office.context.mailbox.item;

  toggleJumpingDots("show");

  try {
    await item.body.getAsync(Office.CoercionType.Text, (asyncResult) => {
      if (asyncResult.status === Office.AsyncResultStatus.Succeeded) {
        setBody(asyncResult.value);
      } else {
        document.getElementById("item-body").innerHTML = "<b>Body:</b> <br/>" + "Error";
      }
    });

    if (body != "") {
      document.getElementById("item-subject").innerHTML = "<h2>Message</h2><b>Subject: </b>" + item.subject + "<br/><b>From: </b>" + item.from.emailAddress;
      document.getElementById("item-body").innerHTML = (
        await runCompletion(
          "Please provide key points and actions for the following and format using HTML H2 headings for Key Points and Actions sections: " + body
        )
      ).text;
    } else {
      document.getElementById("item-body").innerHTML =
        // eslint-disable-next-line prettier/prettier
        "<h2>Key Points & Actions:</h2> <br/>" + "Body empty";
    }
  } catch (error) {
    document.getElementById("item-body").innerHTML =
    // eslint-disable-next-line prettier/prettier
    "<h2>Exception:</h2> <br/>" + error.value;
  }
  toggleJumpingDots("hide");
}

function setBody(asyncResultParam) {
  body = asyncResultParam;
}

function toggleJumpingDots(task) {
  var jumpingdots = document.getElementById("jumpingdots");
  var spacer = document.getElementById("spacer");

  if (task === "hide") {
    jumpingdots.style.display = "none";
    spacer.style.display = "block";
  } else {
    jumpingdots.style.display = "block";
    spacer.style.display = "none";
  }
}
