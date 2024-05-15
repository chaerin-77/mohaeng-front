<script setup></script>

<template>
  <div class="bg-main-color p-20">
    <div class="container flex justify-between">
      <div>
        <h1 class="text-white text-xl font-semibold mb-6">내 프로필</h1>
        <div>
          <div class="bg-white w-[32rem] rounded-2xl p-5 flex">
            <div class="bg-gray-500 h-40 w-32"></div>
            <div class="ml-10">
              <p class="font-semibold text-lg text-gray-600">정채린</p>
              <p class="text-md text-gray-600 mt-2">2001.05.10</p>
              <p class="text-md text-gray-600 mt-5">여행은 항상 즐겁게~</p>
            </div>
          </div>
          <div class="bg-gray-500 w-[32rem] p-4 text-center rounded-xl">
            <p class="text-white">내 정보 수정하기 ></p>
          </div>
        </div>
      </div>
      <div class="ml-10">
        <h1 class="text-white text-xl font-semibold mb-6">내 여행 모임</h1>
        <div class="flex p-5 border-2 border-white w-[55rem] rounded-2xl">
          <div class="text-center m-3">
            <div class="rounded-full border-2 border-white w-20 h-20"></div>
            <p class="text-white text-md mt-3">동기 모임</p>
          </div>
          <div class="text-center m-3">
            <div class="rounded-full bg-orange-300 w-20 h-20 pt-4">
              <font-awesome-icon icon="plus" style="color: white" size="2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container pt-20">
    <p class="text-gray-500 text-xl font-semibold mb-5">나의 다이어리</p>
    <div class="flex p-5 border border-gray-500 rounded-xl shadow-md">
      <div class="bg-gray-500 h-48 w-36"></div>
      <div class="ml-10">
        <p class="font-semibold text-lg text-gray-600">친구들과 광주 나들이</p>
        <p class="text-md text-gray-600 mt-2">2024.05.08 ~ 2024.05.10</p>
        <p class="text-md text-gray-600 mt-2">동기 모임</p>
        <p class="text-md text-gray-600 mt-5">
          멤버: 김민경, 고승희, 홍경현, 정채린
        </p>
      </div>
      <div class="ml-20">
        <p class="text-main-color font-semibold">다이어리 확인하기 ></p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
