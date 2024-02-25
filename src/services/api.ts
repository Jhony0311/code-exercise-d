// eslint-disable-next-line @typescript-eslint/no-explicit-any
function checkStatus(response: any) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(response.statusText);
    // @ts-expect-error Adding context to error in non defined space. Pending improve typings.
    error.response = response;
    throw error;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseJSON(response: { json: () => any }) {
  return response.json();
}

export const api = {
  get: <TResult>(
    url: string,
    opts?: Pick<RequestInit, "signal">
  ): Promise<TResult> => {
    return fetch(url, opts).then(checkStatus).then(parseJSON);
  },
};
