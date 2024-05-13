<script setup></script>

<template>
  <div class="background">
    <div class="yellow-box"></div>
    <div class="login-box">
      <div class="container grid place-items-center mt-20">
        <img
          src="/src/assets/logo-text.png"
          alt=""
          class="block relative w-30 justify-center"
        />
        <div class="grid col-span-full gap-x-6 gap-y-8">
          <form method="post" @submit.prevent="">
            <div class="mt-10 grid gap-x-6 gap-y-8">
              <div class="lg:col-span-8">
                <label
                  for="email"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >아이디</label
                >
                <div class="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    class="block w-full rounded-md border-0 py-1.5 main-color shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div class="lg:col-span-8">
                <label
                  for="email"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >비밀번호</label
                >
                <div class="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div class="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                class="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.background {
  height: 100vh;
  overflow: hidden;
  margin: 0;
  background-image: url("src/assets/background.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.yellow-box {
  height: 100vh;
  width: 100vh;
  overflow: hidden;
  margin: 0;
  background-color: #f2bc57;
  background-size: cover;
  float: right;
}
.login-box {
  height: 75vh;
  width: 80vh;
  overflow: hidden;
  position: absolute;
  margin-left: 80vh;
  margin-top: 12vh;
  background-color: white;
  background-size: cover;
  box-shadow: 4px 4px 20px gray;
}
</style>
