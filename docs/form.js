$(function() {
  let ahcd = undefined;
  function handleFileSelect(evt) {
    const f = evt.target.files[0]
    const reader = new FileReader();
    reader.onload = ((reader) => {
      return () => {
        console.log(reader.result);
        ahcd = new AppleHealthCareData(reader.result);
        console.log("Analyzing");
        ahcd.analyze().writeCsvs();
        console.log(ahcd);
      }
    })(reader);
    reader.readAsText(f);
  }
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    $('#files').on('change', handleFileSelect);
  } else {
    alert('Your browser is not working here ');
  }
});
