import Spinner from "@atlaskit/spinner";

export const Preloader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100%",
        width: "100%"
      }}
    >
      <Spinner size="large" />
    </div>
  )
}