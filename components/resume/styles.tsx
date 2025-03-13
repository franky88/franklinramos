import { StyleSheet, Font } from "@react-pdf/renderer";

Font.register({
  family: "Roboto",
  src: "https://fonts.gstatic.com/s/roboto/v47/KFO7CnqEu92Fr1ME7kSn66aGLdTylUAMa3-UBGEe.woff2",
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 0,
  },
  section: {
    padding: 20,
    borderRadius: 0,
  },
  sectionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#999",
    borderBottomStyle: "solid",
  },
  textHeader: {
    fontSize: 20,
    fontFamily: "Roboto",
    fontWeight: "black",
    fontStyle: "normal",
    fontDisplay: "swap",
    color: "#111",
  },
  textTitle: {
    fontSize: 12,
    fontWeight: "bold",
  },
  textDetails: {
    fontSize: 10,
  },
  textSmall: {
    fontSize: 9,
  },
  textMuted: {
    color: "#666",
  },
  textLink: {
    color: "blue",
  },
  textFlex: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
  textFlexCol: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#888",
    borderBottomStyle: "solid",
    marginBottom: 5,
    marginTop: 2,
  },
  flexDetails: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});

export default styles;
