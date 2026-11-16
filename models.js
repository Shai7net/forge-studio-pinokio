// More models later: the same lists as during install (installer\models.json), downloaded by Forge Studio's installer.
module.exports = {
  run: [
    {
      method: "input",
      params: {
        title: "Download models",
        description: "minimal, recommended, video, all, or groups separated by commas (for example: sd15,animatediff,controlnet,video,flux3). The groups are listed in app/installer/models.json.",
        form: [{
          key: "models",
          title: "Models",
          default: "video"
        }, {
          type: "password",
          key: "hf",
          title: "Hugging Face token (optional, for gated models such as FLUX 3 Klein)",
          placeholder: "hf_..."
        }]
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app",
        message: "call installer\\env.bat && powershell -NoProfile -ExecutionPolicy Bypass -File installer\\install.ps1 -ModelsOnly -Yes -Models {{input.models}}{{input.hf ? ' -HfToken ' + input.hf : ''}}"
      }
    }
  ]
}
