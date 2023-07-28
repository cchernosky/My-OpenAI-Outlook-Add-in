/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global document, Office */

import { runCompletion } from "../../index.js";
var body = "";

Office.onReady((info) => {
  if (info.host === Office.HostType.Outlook) {
    document.getElementById("sideload-msg").style.display = "none";
    document.getElementById("app-body").style.display = "flex";
    document.getElementById("run").onclick = run;
    //run();
  }
});

export async function run() {
  const item = Office.context.mailbox.item;

  document.getElementById("item-subject").innerHTML = "<b>Subject:</b> <br/>" + item.subject;

  await item.body.getAsync(Office.CoercionType.Text, (asyncResult) => {
    if (asyncResult.status === Office.AsyncResultStatus.Succeeded) {
      setBody(asyncResult.value);
    } else {
      document.getElementById("item-body").innerHTML = "<b>Body:</b> <br/>" + "Error";
    }
  });

  //document.getElementById("item-body0").innerHTML = "<b>Body:</b> <br/>" + body.length;

  document.getElementById("item-body").innerHTML =
    "<b>Result:</b> <br/>" + (await runCompletion("please list key points and actions: " + body)).text;
}

function setBody(asyncResultParam) {
  body = asyncResultParam;
}
