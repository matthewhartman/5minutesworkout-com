// Service Worker
var CACHE_NAME = 'v-1580520530155'
var urlsToCache = [
  '/',
  '/default.js',
  '/index.html',
  '/android-chrome-144x144.png',
  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png',
  '/apple-touch-icon.png',
  '/browserconfig.xml',
  '/favicon.ico',
  '/favicon-16x16.png',
  '/favicon-32x32.png',
  '/mstile-150x150.png',
  '/site.webmanifest',
  '/audio/30-seconds-of-jumping-jacks.mp3',
  '/audio/30-seconds-of-push-ups.mp3',
  '/audio/30-seconds-of-squats.mp3',
  '/audio/30-seconds-of-punches.mp3',
  '/audio/30-seconds-of-shoulder-taps.mp3',
  '/audio/30-seconds-of-high-knees.mp3',
  '/audio/30-seconds-of-mountain-climbers.mp3',
  '/audio/30-seconds-of-lunges.mp3',
  '/audio/30-seconds-of-plank.mp3',
  '/audio/30-seconds-of-burpees.mp3',
  '/audio/get-ready-for-jumping-jacks.mp3',
  '/audio/get-ready-for-push-ups.mp3',
  '/audio/get-ready-for-squats.mp3',
  '/audio/get-ready-for-punches.mp3',
  '/audio/get-ready-for-shoulder-taps.mp3',
  '/audio/get-ready-for-high-knees.mp3',
  '/audio/get-ready-for-mountain-climbers.mp3',
  '/audio/get-ready-for-lunges.mp3',
  '/audio/get-ready-for-plank.mp3',
  '/audio/get-ready-for-burpees.mp3'
]

self.addEventListener('install', function(event) {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache) {
      console.log('Opened cache', CACHE_NAME)
      return cache.addAll(urlsToCache)
    })
  )
})

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
    .then(function(response) {
      if (response) {
        console.log('Found ', event.request.url, ' in cache')
        return response
      }
      return fetch(event.request).then(function(response) {
        if(!response || response.status !== 200 || response.type !== 'basic') {
          return response
        }
        var responseToCache = response.clone()
        caches.open(CACHE_NAME)
        .then(function(cache) {
          cache.put(event.request, responseToCache)
        })
        return response
      })
    })
  )
})

self.addEventListener('activate', (event) => {
  var cacheKeeplist = [CACHE_NAME]

  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (cacheKeeplist.indexOf(key) === -1) {
          return caches.delete(key)
        }
      }))
    })
  )
})
