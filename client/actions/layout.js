export default {
  showLoadingView: () => ({type: "SHOW_LOADING"}),
  hideLoadingView: () => ({type: "HIDE_LOADING"}),
  changedWidth: (width) => ({type: "CHANGED_WIDTH", payload: {width: width}}),
}
