<template>
  <div class="container" :style="cssProps">
    <header class="hstack my-4">
      <h1>VirusTotal Theme Builder</h1>

      <div class="links hstack gap-3 ms-auto fs-4">
        <!-- <a role="button" data-bs-toggle="modal" data-bs-target="#howItWorks">
          <i class="bi-question-circle"></i>
        </a> -->
        <a
          href="https://github.com/Diviei/vt-theme-builder"
          rel="noopener"
          target="_blank"
          alt="Project's Github repo"
          aria-label="Project's Github repo"
        >
          <i class="bi-github"></i>
        </a>
      </div>
    </header>

    <prebuiltThemes></prebuiltThemes>

    <div class="row mt-4">
      <form class="col" @submit.prevent="downloadScript">
        <h2>Theme properties</h2>
        <div class="row mb-5">
          <div class="col-12">
            <div class="mb-3">
              <input
                type="text"
                class="form-control"
                v-model="themeName"
                placeholder="Enter your theme name"
                required
                @change="updateUrl"
              />
            </div>
          </div>
          <div class="col-12">
            <div class="form-check">
              <label class="form-check-label">
                <input
                  class="form-check-input"
                  type="radio"
                  value="light"
                  v-model="themeType"
                  @change="updateUrl"
                />

                Light theme
              </label>
            </div>
            <div class="form-check">
              <label class="form-check-label">
                <input
                  class="form-check-input"
                  type="radio"
                  value="dark"
                  v-model="themeType"
                  @change="updateUrl"
                />

                Dark theme
              </label>
            </div>
          </div>
        </div>
        <h2>Main colors</h2>
        <div class="row gy-4 mb-5">
          <div
            class="col-3 text-nowrap"
            v-for="color in mainColors"
            :key="color.name"
          >
            <div class="form-label">{{ color.name }}</div>
            <div class="hstack gap-2">
              <input
                type="text"
                class="form-control"
                v-model="color.value"
                @change="updateUrl"
              />
              <input
                type="color"
                class="form-control form-control-color"
                v-model="color.value"
                @change="updateUrl"
              />
            </div>
          </div>
        </div>

        <h2>Secondary colors</h2>
        <div class="row gy-4 mb-5">
          <div
            class="col-3 text-nowrap"
            v-for="color in secondaryColors"
            :key="color.name"
          >
            <div class="form-label">{{ color.name }}</div>
            <div class="hstack gap-2">
              <input
                type="text"
                class="form-control"
                v-model="color.value"
                @change="updateUrl"
              />
              <input
                type="color"
                class="form-control form-control-color"
                v-model="color.value"
                @change="updateUrl"
              />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12 hstack gap-2">
            <button type="submit" class="btn btn-outline-primary">
              Copy Tampermonkey script
            </button>

            <a
              class="btn btn-outline-info"
              :href="getTwitterLink()"
              target="_blank"
            >
              <i class="bi-twitter"></i>
              Share
            </a>
          </div>
        </div>
      </form>

      <div class="col-5">
        <h2>Preview</h2>
        <div class="row gy-4 position-sticky top-0">
          <div class="col-12">
            <div class="img-thumbnail p-3" v-html="homeMock"></div>
          </div>
          <div class="col-12">
            <div class="img-thumbnail p-3" v-html="fileMock"></div>
          </div>
        </div>
      </div>
    </div>

    <div
      id="genericToast"
      class="toast position-fixed bottom-0 start-0 m-4"
      :class="{ show: toastShown }"
    >
      <div class="d-flex">
        <div class="toast-body">{{ toastMsg }}</div>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <helpModal></helpModal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { generateScriptCode } from "./generate-script";
import homeMock from "./assets/homemock.svg?raw";
import fileMock from "./assets/filemock.svg?raw";
import * as bootstrap from "bootstrap";
import helpModal from "./helpModal.vue";
import prebuiltThemes from "./prebuiltThemes.vue";

const prefix = "--vt-";
let uri = window.location.search.substring(1);
let params = new URLSearchParams(uri);

function colorMap(color: { name: string; value: string }) {
  if (params.get(color.name)) {
    return {
      name: color.name,
      value: "#" + params.get(color.name),
    };
  }
  return color;
}

const mainColors = [
  { name: "body-bg", value: "#ffffff" },
  { name: "body-color", value: "#333333" },
  { name: "border-color", value: "#e6e6e6" },
  { name: "input-border-color", value: "#a6b1c9" },
  { name: "primary", value: "#3a4eff" },
  { name: "danger", value: "#ff1f4a" },
  { name: "warning", value: "#fc9929" },
  { name: "success", value: "#22b573" },
  { name: "disabled-color", value: "#c7ccd6" },
].map(colorMap);
const secondaryColors = [
  { name: "secondary-bg", value: "#f9fafb" },
  { name: "secondary-color", value: "#363c49" },
  { name: "tertiary-bg", value: "#eceef4" },
  { name: "tertiary-color", value: "#626c84" },
  { name: "primary-bg", value: "#3a4eff" },
  { name: "primary-color", value: "#3a4eff" },
  { name: "danger-bg", value: "#ff1f4a" },
  { name: "danger-color", value: "#ff1f4a" },
  { name: "warning-bg", value: "#fc9929" },
  { name: "warning-color", value: "#fc9929" },
  { name: "success-bg", value: "#22b573" },
  { name: "success-color", value: "#22b573" },
].map(colorMap);

export default defineComponent({
  components: {
    helpModal,
    prebuiltThemes,
  },
  data() {
    return {
      themeName: "",
      themeType: "light" as "light" | "dark",
      mainColors,
      secondaryColors,
      homeMock,
      fileMock,
      toastMsg: "",
      toastShown: false,
    };
  },
  mounted() {
    this.themeName = params.get("theme-name") || "";
    this.themeType = (params.get("theme-type") || "") as "light" | "dark";

    document
      .querySelectorAll('[data-bs-toggle="tooltip"]')
      .forEach((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));
  },
  methods: {
    downloadScript() {
      const code = generateScriptCode(
        "--bs-",
        this.themeName,
        this.themeType,
        this.mainColors.concat(this.secondaryColors)
      );
      navigator.clipboard.writeText(code);
      this.showToast("Theme code copied to clipboard");
    },
    showToast(msg: string) {
      this.toastMsg = msg;
      this.toastShown = true;
      setTimeout(() => {
        this.toastShown = false;
      }, 5000);
    },
    updateUrl() {
      let coloursObject = this.mainColors
        .concat(this.secondaryColors)
        .reduce(
          (a, color) => ({ ...a, [color.name]: color.value.replace("#", "") }),
          {}
        );

      window.history.pushState(
        "",
        "",
        "?" +
          new URLSearchParams({
            ...coloursObject,
            ...{ "theme-name": this.themeName },
            ...{ "theme-type": this.themeType },
          }).toString()
      );
    },
    getTwitterLink() {
      return `https://twitter.com/intent/tweet?text=Custom @virustotal theme&url=${encodeURIComponent(
        document.location.href
      )}`;
    },
  },
  computed: {
    cssProps(): any {
      const colors = this.mainColors.concat(this.secondaryColors);
      return colors
        .map((color) => `${prefix}${color.name}: ${color.value};`)
        .join("\n");
    },
  },
});
</script>

<style lang="scss">
#genericToast {
  animation: slideIn 0.5s ease;
}

@keyframes slideIn {
  0% {
    transform: translateY(200px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>
