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
          const filename = `${k}.csv`;
          const a = $(`<a download="${filename}">`).text(`${filename}`)
            .attr('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(ahcd.csv(k)));
          $("#download").append($("<li>").append(a));
        });
      }
    })(reader);
    reader.readAsText(f);
  }
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    $('#file').on('change', handleFileSelect);
  } else {
    alert('Your browser is not supported');
  }
});
