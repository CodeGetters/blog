const handleError = (error: { message: any; name: any }) => {
  console.error(
    `navigator.MediaDevices.getUserMedia error:${error.message},${error.name}`,
  );
};

const getParams = (queryName: string): string | null => {
  const url = window.location.href;
  const query = decodeURI(url.split("?")[1]);
  const vars = query.split("&");
  console.log(`url:${url} query:${query} vars:${vars}`);

  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split("=");
    if (pair[0] === queryName) {
      return pair[1];
    }
  }
  return null;
};

export { handleError, getParams };
