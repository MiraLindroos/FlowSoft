import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const Pdf = ({project, projectsEntries, start, end, totalHours, totalTravels}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header} fixed>
        <Text>Työtunnit projektille: {project.name}</Text>
        <Text style={{fontSize: '0.85rem'}}>Aikaväliltä : {start} - {end}</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.infoRow} fixed>
          <Text style={[styles.text, styles.flex1]}>Päivä</Text>
          <Text style={[styles.text, styles.flex1]}>Tunnit</Text>
          <Text style={[styles.text, styles.flex1]}>Kilometrit</Text>
          <Text style={[styles.text, styles.flex2]}>Muistiinpanot</Text>
        </View>
        {projectsEntries.map((entry) => {
          return (
            <View key={entry.id} style={styles.section}>
              <Text style={[styles.text, styles.flex1]}>{entry.startTime.toDate().toLocaleDateString()}</Text>
              <Text style={[styles.text, styles.flex1]}>{entry.hours} h</Text>
              <Text style={[styles.text, styles.flex1]}>{entry.kilometers ? entry.kilometers : 0} km</Text>
              <Text style={[styles.text, styles.flex2]}>{entry.memo}</Text>
            </View>
          )
        })}
        <View style={[styles.infoRow, { borderTop: '1px solid #ccc'}]}>
          <Text style={[styles.text, styles.flex1]}>Yht.</Text>
          <Text style={[styles.text, styles.flex1]}>{totalHours} h</Text>
          <Text style={[styles.text, styles.flex1]}>{totalTravels ? totalTravels : 0} km</Text>
          <Text style={[styles.text, styles.flex2]}></Text>
        </View>
      </View>
      <Text style={styles.footer} render={({ pageNumber, totalPages }) => (`Flowtec Oy - Sivu ${pageNumber} / ${totalPages}`)} fixed />
    </Page>
  </Document>
)

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: 65,
    paddingHorizontal: 30
  },
  header: {
    margin: 10,
    padding: 10,
    alignItems: 'center'
  },
  container: {
    border: '1px solid black',
    width: '95%',
    marginBottom: 20
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold'
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTop: '1px solid #ccc'
  },
  text: {
    padding: 8,
    width: '25%',
    fontSize: '0.75rem',
    textAlign: 'center',
    borderLeft: '0.5px solid #ccc',
    justifyContent: 'center',
    minHeight: 20
  },
  footer: {
    position: 'absolute',
    fontSize: 12,
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
  flex1: {
    flex: 1
  },
  flex2: {
    flex: 2
  }
})

export default Pdf
