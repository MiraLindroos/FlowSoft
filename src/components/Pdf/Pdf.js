import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    margin: 10,
  },
  title: {
    margin: 10,
    padding: 10,
    textAlign: 'center'
  },
  section: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTop: '1px solid black',
  },
  text: {
    padding: 8,
    width: '25%',
    fontSize: '0.8rem',
    textAlign: 'center',
    borderLeft: '1px solid black',
  }
})

const Pdf = ({project, projectsEntries, start, end}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.title}>
        <Text>Työtunnit projektille: {project.name}</Text>
        <Text>Aikaväliltä : {start} - {end}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>Päivä</Text>
        <Text style={styles.text}>Tunnit</Text>
        <Text style={styles.text}>Kilometrit</Text>
        <Text style={styles.text}>Muistiinpanot</Text>
      </View>
      {projectsEntries.map((entry) => {
          return (
            <View key={entry.id} style={styles.section}>
              <Text style={styles.text}>{entry.startTime.toDate().toLocaleDateString()}</Text>
              <Text style={styles.text}>{entry.hours} h</Text>
              <Text style={styles.text}>{entry.kilometers} km</Text>
              <Text style={styles.text}>{entry.memo}</Text>
            </View>
          )
        }
      )
      }

    </Page>
  </Document>
)

export default Pdf
