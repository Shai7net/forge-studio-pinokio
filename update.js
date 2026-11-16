// The launcher, then Forge Studio itself: the newest code, and its installer again with no new models (it keeps
// settings, models and every tab's data, and only adds what changed). Same as the project's update.bat, without its pause.
module.exports = {
  run: [{
    method: "shell.run",
    params: {
      message: "git pull"
    }
  }, {
    method: "shell.run",
    params: {
      path: "app",
      message: "call installer\\env.bat && git pull --ff-only && powershell -NoProfile -ExecutionPolicy Bypass -File installer\\install.ps1 -Yes -NoShortcut -Models none"
    }
  }]
}
