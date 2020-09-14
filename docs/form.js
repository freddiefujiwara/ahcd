$(function() {
  let ahcd;

  function handleFileSelect(evt) {
    ahcd = undefined;
    $("#download").empty();
    const f = evt.target.files[0]
    const reader = new FileReader();
    reader.onload = ((reader) => {
      return () => {
        ahcd = new AppleHealthCareData(reader.result);
        ahcd.analyze().writeCsvs();
        ahcd.keys().forEach((k) => {
          const a = $('<a href="#">').text(`${k}.csv`);
          a.on('click', () => console.log(ahcd.csv(k)));
          $("#download").append($("<li>").append(a));
        });
      }
    })(reader);
    reader.readAsText(f);
  }
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    $('#files').on('change', handleFileSelect);
  } else {
    alert('Your browser is not supported');
  }
});
