module.exports = {
  requires: { bundle: "ai" },
  run: [
    {
      // (skipped when the choice comes as an argument: pterm start install.js -- --models=none)
      when: "{{!args.models}}",
      method: "input",
      params: {
        title: "Forge Studio models",
        description: "Which models to download now. recommended = SD 1.5 + SDXL, LCM, AnimateDiff, ControlNet (about 12 GB). video = Wan 2.2 (about 40 GB). all = everything (about 92 GB). More later: Download models.",
        form: [{
          type: "select",
          key: "models",
          title: "Models",
          default: "recommended",
          items: [
            { text: "recommended", value: "recommended" },
            { text: "minimal", value: "minimal" },
            { text: "video", value: "video" },
            { text: "all", value: "all" },
            { text: "none", value: "none" }
          ]
        }]
      }
    },
    { method: "local.set", params: { models: "{{args.models || input.models}}" } },
    {
      when: "{{!exists('app')}}",
      method: "shell.run",
      params: { message: "git clone https://github.com/Shai7net/forge-studio app" }
    },
    {
      method: "shell.run",
      // the installer itself (install.bat only adds a closing pause for people who double-click it)
      params: { path: "app", message: "powershell -NoProfile -ExecutionPolicy Bypass -File installer\\install.ps1 -Yes -NoShortcut -Models {{local.models}}" }
    },
    { method: "notify", params: { html: "Forge Studio is installed. Press Start." } }
  ]
}
