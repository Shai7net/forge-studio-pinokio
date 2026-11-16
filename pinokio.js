module.exports = {
  version: "7.0",
  title: "Forge Studio",
  description: "[WINDOWS + NVIDIA 8 GB] An AI creative studio on Stable Diffusion WebUI Forge: FLUX 3, FIBO 2.0, SDXL, Wan 2.2 video, AnimateDiff, Deforum, Simulation 360, Time Strata, Characters and a timeline video editor, with a prompt writer for any language. https://github.com/Shai7net/forge-studio",
  icon: "icon.png",
  menu: async (kernel, info) => {
    let installed = info.exists("app/forge/webui/venv")
    let running = {
      install: info.running("install.js"),
      start: info.running("start.js"),
      update: info.running("update.js"),
      reset: info.running("reset.js"),
      models: info.running("models.js"),
    }
    if (running.install) {
      return [{ default: true, icon: "fa-solid fa-plug", text: "Installing", href: "install.js" }]
    } else if (installed) {
      if (running.start) {
        let local = info.local("start.js")
        if (local && local.url) {
          return [{
            default: true,
            icon: "fa-solid fa-rocket",
            text: "Open Web UI",
            href: local.url,
          }, {
            icon: "fa-solid fa-terminal",
            text: "Terminal",
            href: "start.js",
          }]
        } else {
          return [{ default: true, icon: "fa-solid fa-terminal", text: "Terminal", href: "start.js" }]
        }
      } else if (running.update) {
        return [{ default: true, icon: "fa-solid fa-terminal", text: "Updating", href: "update.js" }]
      } else if (running.models) {
        return [{ default: true, icon: "fa-solid fa-terminal", text: "Downloading models", href: "models.js" }]
      } else if (running.reset) {
        return [{ default: true, icon: "fa-solid fa-terminal", text: "Resetting", href: "reset.js" }]
      } else {
        return [{
          default: true,
          icon: "fa-solid fa-power-off",
          text: "Start",
          href: "start.js",
        }, {
          icon: "fa-solid fa-download",
          text: "Download models",
          href: "models.js",
        }, {
          icon: "fa-solid fa-plug",
          text: "Update",
          href: "update.js",
        }, {
          icon: "fa-solid fa-plug",
          text: "Install",
          href: "install.js",
        }, {
          icon: "fa-regular fa-circle-xmark",
          text: "Reset",
          href: "reset.js",
          confirm: "Are you sure you wish to reset the app? Everything in app/ (models and outputs too) is deleted."
        }]
      }
    } else {
      return [{ default: true, icon: "fa-solid fa-plug", text: "Install", href: "install.js" }]
    }
  }
}
