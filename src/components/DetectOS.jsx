export default function DetectOS({ voiceList }) {
  let OS;

  if (!voiceList || voiceList?.length === 0) {
    window.navigator.userAgent.includes("Android")
      ? (OS = "Android")
      : window.navigator.userAgent.includes("Windows Phone")
      ? (OS = "Windows Phone")
      : window.navigator.userAgent.includes("Windows")
      ? (OS = "Windows")
      : window.navigator.userAgent.includes("iPhone")
      ? (OS = "iPhone")
      : window.navigator.userAgent.includes("Linux")
      ? (OS = "Linux")
      : window.navigator.userAgent.includes("CrOS")
      ? (OS = "ChromeOS")
      : window.navigator.userAgent.includes("Macintosh")
      ? (OS = "MacOS")
      : (OS = "undefined");
  } else {
    return;
  }

  return (
    <>
      <div>You don't have any voice installed on your device.</div>
      {OS === "Windows" ? (
        <div>
          <a
            href="https://support.microsoft.com/en-gb/topic/download-languages-and-voices-for-immersive-reader-read-mode-and-read-aloud-4c83a8d8-7486-42f7-8e46-2b0fdf753130"
            target="_blank"
          >
            Learn how to install voices on {OS}
          </a>
        </div>
      ) : OS === "Macintosh" ? (
        <div>
          <a href="https://support.apple.com/guide/mac-help/change-the-voice-your-mac-uses-to-speak-text-mchlp2290/mac">
            Learn how to install voices on {OS}
          </a>
        </div>
      ) : OS === "iPhone" ? (
        <div>
          <a href="https://support.apple.com/guide/iphone/change-your-voiceover-settings-iphfa3d32c50/ios">
            Learn how to install voices on {OS}
          </a>
        </div>
      ) : OS === "Android" ? (
        <div>
          <a href="https://play.google.com/store/apps/details?id=com.google.android.tts&hl=en&gl=US">
            Learn how to install voices on {OS}
          </a>
        </div>
      ) : OS === "ChromeOS" ? (
        <div>
          <a href="https://support.google.com/accessibility/answer/11221616">
            Learn how to install voices on {OS}
          </a>
        </div>
      ) : null}
      {OS === "Linux" && (
        <div>Browser text to speech is not available on Linux.</div>
      )}
    </>
  );
}
