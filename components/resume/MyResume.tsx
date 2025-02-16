import { Document, Page, Text, View, Link, Image } from "@react-pdf/renderer";
import styles from "./styles";

interface MyResumeProps {
  experience: Experience[];
  skills?: Skill[];
}

const MyResume = ({ experience, skills }: MyResumeProps) => {
  return (
    <Document title="Franklin Ramos" author="Franklin Ramos">
      <Page size="LEGAL" style={styles.page}>
        <View style={[styles.section, styles.sectionBorder]}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 30,
            }}
          >
            <View>
              <Image src={"/profile.jpg"} style={{ width: 100, height: 100 }} />
            </View>
            <View style={[styles.textFlexCol]}>
              <View>
                <View>
                  <Text style={[styles.textHeader]}>FRANKLIN RAMOS</Text>
                  <Text style={styles.textTitle}>
                    Multimedia Artist / Web Developer
                  </Text>
                </View>
              </View>
              <View
                style={[styles.textFlex, styles.textSmall, styles.textLink]}
              >
                <View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <Image
                      src={"/icons/mail.png"}
                      style={{ width: 8, height: 8 }}
                    />
                    <Link
                      src="mailto:ramosfp99@gmail.com"
                      style={{ textDecoration: "none" }}
                    >
                      <Text>ramosfp99@gmail.com</Text>
                    </Link>
                  </View>
                </View>

                <View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <Image
                      src={"/icons/phone-call.png"}
                      style={{ width: 8, height: 8 }}
                    />
                    <Link
                      src="tel:+649302785910"
                      style={{ textDecoration: "none" }}
                    >
                      <Text>+64 930 278 5910</Text>
                    </Link>
                  </View>
                </View>

                <View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <Image
                      src={"/icons/earth.png"}
                      style={{ width: 8, height: 8 }}
                    />
                    <Link
                      src="https://franklinramos.vercel.app"
                      style={{ textDecoration: "none" }}
                    >
                      <Text>www.franklinramos.vercel.app</Text>
                    </Link>
                  </View>
                </View>
              </View>
              <View>
                <Text style={[styles.textSmall, { maxWidth: 430 }]}>
                  I am a versatile Multimedia Artist with over 10 years of
                  experience in graphic design, video editing, animation, and
                  web development. Skilled in Adobe Creative Suite and various
                  multimedia tools, I create visually compelling and
                  user-friendly digital experiences. With a passion for
                  creativity and innovation, I deliver high-quality designs,
                  animations, and websites that make an impact.
                </Text>
              </View>
            </View>
          </View>
        </View>

        {"work experience and details"}

        <View style={[styles.section, { display: "flex", gap: 20 }]}>
          <View style={[styles.textFlexCol]}>
            <View>
              <Text style={styles.textTitle}>SKILLS</Text>
              <View style={styles.horizontalLine}></View>
              <View
                style={{
                  display: "flex",
                  gap: 5,
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {skills?.map((skill) => (
                  <Text key={skill._id} style={styles.textDetails}>
                    {skill.name},
                  </Text>
                ))}
              </View>
            </View>
          </View>
          <View style={[styles.textFlexCol]}>
            <View>
              <Text style={styles.textTitle}>WORK EXPERIENCE</Text>
              <View style={styles.horizontalLine}></View>
              <View>
                {experience.map((ex) => (
                  <View key={ex._id}>
                    <View style={styles.textFlex}>
                      <View style={{ width: "120px" }}>
                        <Text style={[styles.textDetails]}>
                          {ex.startDate
                            ? new Date(ex.startDate).toLocaleString("en-US", {
                                month: "short",
                              }) +
                              " " +
                              new Date(ex.startDate).getUTCFullYear()
                            : "N/A"}{" "}
                          to{" "}
                          {ex.endDate
                            ? new Date(ex.endDate).toLocaleString("en-US", {
                                month: "short",
                              }) +
                              " " +
                              new Date(ex.endDate).getUTCFullYear()
                            : "N/A"}
                        </Text>
                      </View>
                      <View
                        style={{ marginBottom: 10, display: "flex", gap: 5 }}
                      >
                        <View>
                          <Text style={[styles.textDetails]}>
                            {ex.position.toUpperCase()}
                          </Text>
                          <Text style={[styles.textDetails, styles.textMuted]}>
                            Company: {ex.company}
                          </Text>
                        </View>
                        <View
                          style={{
                            paddingTop: 5,
                            width: "100%",
                          }}
                        >
                          <Text style={styles.textSmall}>
                            Tasks and Responsibilities:
                          </Text>
                          <View>
                            {ex.description?.split(", ").map((s, index) => (
                              <Text
                                key={index}
                                style={[styles.textSmall, styles.textMuted]}
                              >
                                {s}
                              </Text>
                            ))}
                          </View>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        borderBottomColor: "#999",
                        borderBottomWidth: 0.5,
                        borderBottomStyle: "dashed",
                        marginBottom: 5,
                      }}
                    ></View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </Page>
      <Page size={"LEGAL"} style={styles.page}>
        <View style={[styles.section, styles.textFlexCol]}>
          <View style={[styles.textFlexCol]}>
            <View>
              <Text style={styles.textTitle}>EDUCATION</Text>
              <View style={styles.horizontalLine}></View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default MyResume;
