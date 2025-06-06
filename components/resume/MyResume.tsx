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
        <View
          style={[
            styles.section,
            styles.sectionBorder,
            { backgroundColor: "#e0ebff" },
          ]}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 30,
            }}
          >
            <View>
              <Image
                src={"/profile_image_old.png"}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 10,
                  backgroundColor: "white",
                }}
              />
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

        <View style={[styles.section]}>
          <View style={[styles.textFlexCol]}>
            <View style={{ width: "100%", padding: 5 }}>
              <Text style={styles.textTitle}>SKILLS AND SOFTSKILLS</Text>
              <View style={styles.horizontalLine}></View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 8,
                    }}
                  >
                    <Text style={styles.textDetails}>LANGUAGES:</Text>
                    {skills?.map(
                      (skill) =>
                        skill.skillType === "Languages" && (
                          <View
                            key={skill._id}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              gap: 2,
                            }}
                          >
                            <Text style={[styles.textDetails]}>
                              {skill.name},
                            </Text>
                          </View>
                        )
                    )}
                  </View>
                </View>
                <View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 8,
                    }}
                  >
                    <Text style={styles.textDetails}>SKILLS:</Text>
                    {skills?.map(
                      (skill) =>
                        skill.skillType === "Skills" && (
                          <View
                            key={skill._id}
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              gap: 2,
                            }}
                          >
                            <Text style={[styles.textDetails]}>
                              {skill.name},
                            </Text>
                          </View>
                        )
                    )}
                  </View>
                </View>
                <View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 8,
                    }}
                  >
                    <Text style={styles.textDetails}>APPLICATIONS:</Text>
                    {skills?.map(
                      (skill) =>
                        skill.skillType === "Applications" && (
                          <View
                            key={skill._id}
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              gap: 2,
                            }}
                          >
                            <Text style={[styles.textDetails]}>
                              {skill.name},
                            </Text>
                          </View>
                        )
                    )}
                  </View>
                </View>
                <View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 8,
                    }}
                  >
                    <Text style={styles.textDetails}>FRAMEWORKS:</Text>
                    {skills?.map(
                      (skill) =>
                        skill.skillType === "Framework" && (
                          <View
                            key={skill._id}
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              gap: 2,
                            }}
                          >
                            <Text style={[styles.textDetails]}>
                              {skill.name},
                            </Text>
                          </View>
                        )
                    )}
                  </View>
                </View>
              </View>
            </View>
            <View style={{ width: "100%", padding: 5 }}>
              <Text style={styles.textTitle}>WORK EXPERIENCE</Text>
              <View style={styles.horizontalLine}></View>
              {experience.map((ex) => (
                <View key={ex._id}>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ marginBottom: 10, display: "flex", gap: 5 }}>
                      <View>
                        <Text style={[styles.textDetails]}>
                          {ex.position.toUpperCase()}
                        </Text>
                        <Text style={[styles.textDetails, styles.textMuted]}>
                          Company: {ex.company}
                        </Text>
                      </View>
                    </View>
                    <View>
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
                  </View>
                </View>
              ))}
            </View>
            <View style={{ width: "100%", padding: 5 }}>
              <Text style={styles.textTitle}>EDUCATION</Text>
              <View style={styles.horizontalLine}></View>
              <View style={[styles.flexDetails]}>
                <View>
                  <Text style={styles.textDetails}>
                    BACHELOR OF SCIENCE IN OFFICE ADMINISTRATION (ETEEAP)
                  </Text>
                  <Text style={[styles.textSmall, styles.textMuted]}>
                    Cebu Institute of Technology - University
                  </Text>
                </View>
                <View>
                  <Text style={styles.textDetails}>Mar 2018 to Nov 2018</Text>
                </View>
              </View>
              <View style={[styles.flexDetails]}>
                <View>
                  <Text style={styles.textDetails}>
                    COMPUTER SYSTEMS SERVICING
                  </Text>
                  <Text style={[styles.textSmall, styles.textMuted]}>
                    Iligan Computer Institute
                  </Text>
                </View>
                <View>
                  <Text style={styles.textDetails}>Nov 2015 to Dec 2015</Text>
                </View>
              </View>
              <View style={[styles.flexDetails]}>
                <View>
                  <Text style={styles.textDetails}>
                    PROFESSIONAL ASSISTANT 2D ANIMATOR
                  </Text>
                  <Text style={[styles.textSmall, styles.textMuted]}>
                    Iligan Computer Institute
                  </Text>
                </View>
                <View>
                  <Text style={styles.textDetails}>Jun 2008 to Nov 2008</Text>
                </View>
              </View>
              <View style={[styles.flexDetails]}>
                <View>
                  <Text style={styles.textDetails}>
                    BACHELOR OF SCIENCE IN BUSINESS ADMINISTRATION MAJOR IN
                    FINANCIAL MANAGEMENT
                  </Text>
                  <Text style={[styles.textSmall, styles.textMuted]}>
                    Tagoloan Community College
                  </Text>
                </View>
                <View>
                  <Text style={styles.textDetails}>Jun 2007 to Mar 2008</Text>
                </View>
              </View>
            </View>
            <View style={{ width: "100%", padding: 5 }}>
              <Text style={styles.textTitle}>
                NATIONAL CERTIFICATION PASSED
              </Text>
              <View style={styles.horizontalLine}></View>
              <View style={[styles.flexDetails]}>
                <View>
                  <Text style={styles.textDetails}>
                    COMPUTER SYSTEMS SERVICING NC II
                  </Text>
                  <Text style={[styles.textSmall, styles.textMuted]}>
                    Technical Education and Skills Development Authority (TESDA)
                  </Text>
                </View>
                <View>
                  <Text style={styles.textDetails}>2015</Text>
                </View>
              </View>
              <View style={[styles.flexDetails]}>
                <View>
                  <Text style={styles.textDetails}>
                    VISUAL GRAPHICS DESIGN NC III
                  </Text>
                  <Text style={[styles.textSmall, styles.textMuted]}>
                    Technical Education and Skills Development Authority (TESDA)
                  </Text>
                </View>
                <View>
                  <Text style={styles.textDetails}>2012</Text>
                </View>
              </View>
              <View style={[styles.flexDetails]}>
                <View>
                  <Text style={styles.textDetails}>
                    2D ANIMATION (DIGITAL) NC III
                  </Text>
                  <Text style={[styles.textSmall, styles.textMuted]}>
                    Technical Education and Skills Development Authority (TESDA)
                  </Text>
                </View>
                <View>
                  <Text style={styles.textDetails}>2012</Text>
                </View>
              </View>
            </View>
            <View style={{ width: "100%", padding: 5 }}>
              <Text style={styles.textTitle}>
                NATIONAL TVET TRAINER CERTIFICATE (NTTC)
              </Text>
              <View style={styles.horizontalLine}></View>
              <View style={[styles.flexDetails]}>
                <View>
                  <Text style={styles.textDetails}>
                    VISUAL GRAPHICS DESIGN NC III
                  </Text>
                  <Text style={[styles.textSmall, styles.textMuted]}>
                    Technical Education and Skills Development Authority (TESDA)
                  </Text>
                </View>
                <View>
                  <Text style={styles.textDetails}>2012</Text>
                </View>
              </View>
              <View style={[styles.flexDetails]}>
                <View>
                  <Text style={styles.textDetails}>
                    2D ANIMATION (DIGITAL) NC III
                  </Text>
                  <Text style={[styles.textSmall, styles.textMuted]}>
                    Technical Education and Skills Development Authority (TESDA)
                  </Text>
                </View>
                <View>
                  <Text style={styles.textDetails}>2012</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Page>
      {/* <Page size={"LEGAL"} style={styles.page}>
        <View style={[styles.section, styles.textFlexCol]}>
          <View style={[styles.textFlexCol]}>
            <View>
              <Text style={styles.textTitle}>EDUCATION</Text>
              <View style={styles.horizontalLine}></View>
              <View style={[styles.flexDetails]}>
                <View>
                  <Text style={styles.textDetails}>
                    Bachelor of Science in Office Administration (ETEEAP)
                  </Text>
                  <Text style={[styles.textSmall, styles.textMuted]}>
                    Cebu Institute of Technology - University
                  </Text>
                </View>
                <View>
                  <Text style={styles.textDetails}>Mar 2018 to Nov 2018</Text>
                </View>
              </View>
              <View style={[styles.flexDetails]}>
                <View>
                  <Text style={styles.textDetails}>
                    Computer Systems Servicing
                  </Text>
                  <Text style={[styles.textSmall, styles.textMuted]}>
                    Iligan Computer Institute
                  </Text>
                </View>
                <View>
                  <Text style={styles.textDetails}>Nov 2015 to Dec 2015</Text>
                </View>
              </View>
              <View style={[styles.flexDetails]}>
                <View>
                  <Text style={styles.textDetails}>
                    Professional Assistant 2D Animator
                  </Text>
                  <Text style={[styles.textSmall, styles.textMuted]}>
                    Iligan Computer Institute
                  </Text>
                </View>
                <View>
                  <Text style={styles.textDetails}>Jun 2008 to Nov 2008</Text>
                </View>
              </View>
              <View style={[styles.flexDetails]}>
                <View>
                  <Text style={styles.textDetails}>
                    Bachelor of Science in Business Administration Major in
                    Financial Management
                  </Text>
                  <Text style={[styles.textSmall, styles.textMuted]}>
                    Tagoloan Community College
                  </Text>
                </View>
                <View>
                  <Text style={styles.textDetails}>Jun 2007 to Mar 2008</Text>
                </View>
              </View>
            </View>
            <View>
              <Text style={styles.textTitle}>
                NATIONAL CERTIFICATION PASSED
              </Text>
              <View style={styles.horizontalLine}></View>
              <View style={[styles.flexDetails]}>
                <View>
                  <Text style={styles.textDetails}>
                    Computer Systems Servicing NC II
                  </Text>
                  <Text style={[styles.textSmall, styles.textMuted]}>
                    Technical Education and Skills Development Authority (TESDA)
                  </Text>
                </View>
                <View>
                  <Text style={styles.textDetails}>2015</Text>
                </View>
              </View>
              <View style={[styles.flexDetails]}>
                <View>
                  <Text style={styles.textDetails}>
                    Visual Graphics Design NC III
                  </Text>
                  <Text style={[styles.textSmall, styles.textMuted]}>
                    Technical Education and Skills Development Authority (TESDA)
                  </Text>
                </View>
                <View>
                  <Text style={styles.textDetails}>2012</Text>
                </View>
              </View>
              <View style={[styles.flexDetails]}>
                <View>
                  <Text style={styles.textDetails}>
                    2D Animation (Digital) NC III
                  </Text>
                  <Text style={[styles.textSmall, styles.textMuted]}>
                    Technical Education and Skills Development Authority (TESDA)
                  </Text>
                </View>
                <View>
                  <Text style={styles.textDetails}>2012</Text>
                </View>
              </View>
            </View>
            <View>
              <Text style={styles.textTitle}>
                NATIONAL TVET TRAINER CERTIFICATE (NTTC)
              </Text>
              <View style={styles.horizontalLine}></View>
              <View style={[styles.flexDetails]}>
                <View>
                  <Text style={styles.textDetails}>
                    Visual Graphics Design NC III
                  </Text>
                  <Text style={[styles.textSmall, styles.textMuted]}>
                    Technical Education and Skills Development Authority (TESDA)
                  </Text>
                </View>
                <View>
                  <Text style={styles.textDetails}>2012</Text>
                </View>
              </View>
              <View style={[styles.flexDetails]}>
                <View>
                  <Text style={styles.textDetails}>
                    2D Animation (Digital) NC III
                  </Text>
                  <Text style={[styles.textSmall, styles.textMuted]}>
                    Technical Education and Skills Development Authority (TESDA)
                  </Text>
                </View>
                <View>
                  <Text style={styles.textDetails}>2012</Text>
                </View>
              </View>
            </View>
            <View>
              <Text style={styles.textTitle}>
                AWARDS AND RECOGNITIONS RECEIVED
              </Text>
              <View style={styles.horizontalLine}></View>
              <View style={[styles.flexDetails]}>
                <View>
                  <Text style={styles.textDetails}>
                    Excellent Performance Award
                  </Text>
                  <Text style={[styles.textSmall, styles.textMuted]}>
                    Fligno / AdonPH Inc.
                  </Text>
                </View>
                <View>
                  <Text style={styles.textDetails}>2021</Text>
                </View>
              </View>
              <View style={[styles.flexDetails]}>
                <View>
                  <Text style={styles.textDetails}>
                    Most Outstanding Faculty of the Year
                  </Text>
                  <Text style={[styles.textSmall, styles.textMuted]}>
                    Iligan Computer Institute
                  </Text>
                </View>
                <View>
                  <Text style={styles.textDetails}>2014</Text>
                </View>
              </View>
              <View style={[styles.flexDetails]}>
                <View>
                  <Text style={styles.textDetails}>
                    Best in Attendance Faculty
                  </Text>
                  <Text style={[styles.textSmall, styles.textMuted]}>
                    Iligan Computer Institute
                  </Text>
                </View>
                <View>
                  <Text style={styles.textDetails}>2014</Text>
                </View>
              </View>
              <View style={[styles.flexDetails]}>
                <View>
                  <Text style={styles.textDetails}>Most Punctual Faculty</Text>
                  <Text style={[styles.textSmall, styles.textMuted]}>
                    Iligan Computer Institute
                  </Text>
                </View>
                <View>
                  <Text style={styles.textDetails}>2014</Text>
                </View>
              </View>
              <View style={[styles.flexDetails]}>
                <View>
                  <Text style={styles.textDetails}>
                    Most Outstanding Faculty of the Year
                  </Text>
                  <Text style={[styles.textSmall, styles.textMuted]}>
                    Iligan Computer Institute
                  </Text>
                </View>
                <View>
                  <Text style={styles.textDetails}>2011</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Page> */}
    </Document>
  );
};

export default MyResume;
