import Navbar from "../avatar/Navbar";

export default function Paid() {
  return (
    <>
    <Navbar />
      <h1>Paid Services</h1>
      <h2>Some examples</h2>
      <h2>
        <a href="https://aws.amazon.com/polly/?nc1=h_ls">Amazon Polly</a>
      </h2>
      <ul>
        <li>36 languages (no Hebrew)</li>
        <li>101 voices</li>
        <li>
          <a href="https://aws.amazon.com/polly/pricing/?nc1=h_ls">Pricing</a>
        </li>
      </ul>
      <h2>
        <a href="https://azure.microsoft.com/en-us/products/cognitive-services/text-to-speech/">
          Microsoft Azure
        </a>
      </h2>
      <ul>
        <li>140 languages</li>
        <li>400 voices</li>
        <li>
          <a href="https://azure.microsoft.com/en-us/pricing/details/cognitive-services/speech-services/">
            Pricing
          </a>
        </li>
        <ul>
          <li>0.5 million characters free per month (Neural)</li>
          <li>Real-time & batch synthesis: $16 per 1M characters</li>
        </ul>
      </ul>
      <h2>
        <a href="https://cloud.google.com/text-to-speech">Google Cloud</a>
      </h2>
      <ul>
        <li>40 languages</li>
        <li>220 voices</li>
        <li>
          <a href="https://cloud.google.com/text-to-speech/pricing">Pricing</a>
        </li>
        <ul>
          <li>Normal voices: 4 million characters free per month</li>
          <ul>
            <li>Then 4 dollars per 1 million characters</li>
          </ul>
          <li>WaveNet & Neural voices: 1 million characters free per month</li>
          <ul>
            <li>Then 16 dollars per 1 million characters</li>
          </ul>
        </ul>
      </ul>
    </>
  );
}
