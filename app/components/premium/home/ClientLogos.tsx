// Client logo strip (server component). Logos sit on light tiles because
// several are dark artwork on transparent backgrounds.
import Image from 'next/image';

const CLIENTS = [
  { name: 'Agmatel', logo: '/partners/partner1.png' },
  { name: 'Team Computers', logo: '/partners/partner2.png' },
  { name: 'Transcorp', logo: '/partners/partner3.png' },
  { name: 'Ind Innovation', logo: '/partners/partner4.png' },
  { name: 'Transline Technologies', logo: '/partners/partner5.png' },
  { name: 'Orient Technologies', logo: '/partners/partner6.png' },
  { name: 'Hitachi', logo: '/partners/partner7.png' },
  { name: 'Uniserved', logo: '/partners/partner8.png' },
];

export default function ClientLogos() {
  return (
    <section className="vz-section vz-section--tight" aria-labelledby="vz-clients-title">
      <div className="vz-container">
        <h2 id="vz-clients-title" className="vz-eyebrow vz-clients__title">Trusted by teams at</h2>
        <ul className="vz-clients" role="list">
          {CLIENTS.map((c) => (
            <li key={c.name}>
              <Image src={c.logo} alt={`${c.name} logo`} width={160} height={56} sizes="160px" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
