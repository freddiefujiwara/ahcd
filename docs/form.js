$(function() {
  const ahcds = [];
  function handleFileSelect(evt) {
    console.log(evt.target.file);
    console.log(evt.target.files);
    /*
    evt.target.files.forEach((f) => {
      const reader = new FileReader();
      reader.onload = ((reader) => {
        return () => {
          const contents = reader.result;
          const ahcd = new AppleHealthCareData(contents);
          ahcd.analyze().writeCsvs();
          ahcds.push(ahcd);
          console.log(contents);
        }
      })(reader);
      reader.readAsText(f);
    });
  */
  }
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    $('#files').on('change', handleFileSelect);
  } else {
    alert('Your browser is not working here ');
  }
});
