export let kFormatter = (num: number) => {
  // TODO try to remove
  return num > 999 ? (num / 1000).toFixed(1) + "k" : num;
};

export let timeSince = (date: number) => {
  let nowUnixDate = Math.floor(new Date().getTime() / 1000);
  let seconds = nowUnixDate - date;

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
};

export let urlFormatter = (url: string) => {
  // return url.replace(/^https?:\/\/(www.)?/, "");
  let domain = new URL(url);
  return domain.hostname;
};
