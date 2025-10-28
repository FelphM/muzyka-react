import "../styles/map.css"

export function Map() {
  return (
    <>
      <iframe
        frameBorder="0"
        scrolling="no"
        marginHeight={0}
        marginWidth={0}
        id="gmap_canvas"
        src="https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=%20Santiago+(Av.%20Providencia)&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
      ></iframe>{" "}
      <script
        type="text/javascript"
        src="https://embedmaps.com/google-maps-authorization/script.js?id=ba97a89bde0bca8be461db908fca7ec3bf445534"
      ></script>
    </>
  );
}
