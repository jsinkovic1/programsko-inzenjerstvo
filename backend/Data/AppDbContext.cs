using System;
using System.Collections.Generic;
using CharterBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace CharterBackend.Data;

public partial class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {

    }

    public virtual DbSet<Fotografija> Fotografije { get; set; }

    public virtual DbSet<Korisnik> Korisnici { get; set; }

    public virtual DbSet<Luka> Luke { get; set; }

    public virtual DbSet<Nedostupnitermin> Nedostupnitermini { get; set; }

    public virtual DbSet<Oprema> Oprema { get; set; }

    public virtual DbSet<Plovilo> Plovila { get; set; }

    public virtual DbSet<Proizvodac> Proizvodaci { get; set; }

    public virtual DbSet<Rezervacija> Rezervacije { get; set; }

    public virtual DbSet<Termin> Termini { get; set; }

    public virtual DbSet<Tipplovila> Tipplovila { get; set; }

    public virtual DbSet<Usluga> Usluge { get; set; }
    public virtual DbSet<Imadodatneusluge> Imadodatneusluge { get; set; }
    public virtual DbSet<Imadodatnuopremu> Imadodatnuopremu { get; set; }
    public virtual DbSet<Imaopremu> ImaOpremu { get; set; }
    public virtual DbSet<Korisnik_rezervacija> Korisnik_rezervacija { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasPostgresExtension("btree_gist");

        modelBuilder.Entity<Fotografija>(entity =>
        {
            entity.HasKey(e => e.Idfotografije).HasName("fotografija_pkey");

            entity.ToTable("fotografija");

            entity.Property(e => e.Idfotografije)
                .UseIdentityAlwaysColumn()
                .HasColumnName("idfotografije");
            entity.Property(e => e.Glavnaslika).HasColumnName("glavnaslika");
            entity.Property(e => e.Idplovila).HasColumnName("idplovila");
            entity.Property(e => e.Url)
                .HasMaxLength(255)
                .HasColumnName("url");

            entity.HasOne(d => d.Plovilo).WithMany(p => p.Fotografije)
                .HasForeignKey(d => d.Idplovila)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fotografija_idplovila_fkey");
        });

        modelBuilder.Entity<Korisnik>(entity =>
        {
            entity.HasKey(e => e.Idkorisnika).HasName("korisnik_pkey");

            entity.ToTable("korisnik");

            entity.HasIndex(e => e.Mail, "korisnik_mail_key").IsUnique();

            entity.HasIndex(e => e.Username, "korisnik_username_key").IsUnique();

            entity.Property(e => e.Idkorisnika)
                .UseIdentityAlwaysColumn()
                .HasColumnName("idkorisnika");
            entity.Property(e => e.Aktivan).HasColumnName("aktivan");
            entity.Property(e => e.Ime)
                .HasMaxLength(50)
                .HasColumnName("ime");
            entity.Property(e => e.Mail)
                .HasMaxLength(100)
                .HasColumnName("mail");
            entity.Property(e => e.Prezime)
                .HasMaxLength(50)
                .HasColumnName("prezime");
            entity.Property(e => e.Uloga)
                .HasMaxLength(20)
                .HasColumnName("uloga");
            entity.Property(e => e.Username)
                .HasMaxLength(50)
                .HasColumnName("username");
        });

        modelBuilder.Entity<Luka>(entity =>
        {
            entity.HasKey(e => e.Idluke).HasName("luka_pkey");

            entity.ToTable("luka");

            entity.Property(e => e.Idluke)
                .UseIdentityAlwaysColumn()
                .HasColumnName("idluke");
            entity.Property(e => e.Latituda)
                .HasPrecision(9, 6)
                .HasColumnName("latituda");
            entity.Property(e => e.Longituda)
                .HasPrecision(9, 6)
                .HasColumnName("longituda");
            entity.Property(e => e.Mjesto)
                .HasMaxLength(100)
                .HasColumnName("mjesto");
            entity.Property(e => e.Nazivluke)
                .HasMaxLength(100)
                .HasColumnName("nazivluke");
        });

        modelBuilder.Entity<Nedostupnitermin>(entity =>
        {
            entity.HasKey(e => e.Idtermina).HasName("nedostupnitermin_pkey");

            entity.ToTable("nedostupnitermin");

            entity.Property(e => e.Idtermina)
                .ValueGeneratedNever()
                .HasColumnName("idtermina");
            entity.Property(e => e.Opis)
                .HasMaxLength(255)
                .HasColumnName("opis");

            entity.HasOne(d => d.Termin).WithOne(p => p.Nedostupnitermin)
                .HasForeignKey<Nedostupnitermin>(d => d.Idtermina)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("nedostupnitermin_idtermina_fkey");
        });

        modelBuilder.Entity<Oprema>(entity =>
        {
            entity.HasKey(e => e.Idopreme).HasName("oprema_pkey");

            entity.ToTable("oprema");

            entity.Property(e => e.Idopreme)
                .UseIdentityAlwaysColumn()
                .HasColumnName("idopreme");
            entity.Property(e => e.Cijenanajma)
                .HasPrecision(10, 2)
                .HasColumnName("cijenanajma");
            entity.Property(e => e.Nazivopreme)
                .HasMaxLength(100)
                .HasColumnName("nazivopreme");

            entity.HasMany(d => d.Rezervacije).WithMany(p => p.Oprema)
                .UsingEntity<Imadodatnuopremu>(
                    r => r.HasOne(e => e.Rezervacija)
                        .WithMany()
                        .HasForeignKey(e => e.idtermina),
                    l => l.HasOne(e => e.Oprema)
                        .WithMany()
                        .HasForeignKey(e => e.idopreme),
                    j =>
                    {
                        j.HasKey(e => new { e.idtermina, e.idopreme });
                        j.ToTable("imadodatnuopremu");
                    });

            modelBuilder.Entity<Plovilo>(entity =>
            {
                entity.HasKey(e => e.Idplovila).HasName("plovilo_pkey");

                entity.ToTable("plovilo");

                entity.Property(e => e.Idplovila)
                    .UseIdentityAlwaysColumn()
                    .HasColumnName("idplovila");
                entity.Property(e => e.Brojkabina).HasColumnName("brojkabina");
                entity.Property(e => e.Brojlezajeva).HasColumnName("brojlezajeva");
                entity.Property(e => e.Dnevnacijenanajma)
                    .HasPrecision(10, 2)
                    .HasColumnName("dnevnacijenanajma");
                entity.Property(e => e.Godinaproizvodnje).HasColumnName("godinaproizvodnje");
                entity.Property(e => e.Idluke).HasColumnName("idluke");
                entity.Property(e => e.Idproizvodaca).HasColumnName("idproizvodaca");
                entity.Property(e => e.Idtipaplovila).HasColumnName("idtipaplovila");
                entity.Property(e => e.Kapacitet).HasColumnName("kapacitet");
                entity.Property(e => e.Model)
                    .HasMaxLength(50)
                    .HasColumnName("model");
                entity.Property(e => e.Nazivplovila)
                    .HasMaxLength(100)
                    .HasColumnName("nazivplovila");

                entity.HasOne(d => d.Luka).WithMany(p => p.Plovila)
                    .HasForeignKey(d => d.Idluke)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("plovilo_idluke_fkey");

                entity.HasOne(d => d.Proizvodac).WithMany(p => p.Plovila)
                    .HasForeignKey(d => d.Idproizvodaca)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("plovilo_idproizvodaca_fkey");

                entity.HasOne(d => d.Tipplovila).WithMany(p => p.Plovila)
                    .HasForeignKey(d => d.Idtipaplovila)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("plovilo_idtipaplovila_fkey");

                entity.HasMany(d => d.Oprema).WithMany(p => p.Plovila)
                    .UsingEntity<Imaopremu>(
                        r => r.HasOne(e => e.Oprema)
                            .WithMany()
                            .HasForeignKey(e => e.idopreme),
                        l => l.HasOne(e => e.Plovilo)
                            .WithMany()
                            .HasForeignKey(e => e.idplovila),
                        j =>
                        {
                            j.HasKey(e => new { e.idplovila, e.idopreme });
                            j.ToTable("imaopremu");
                        });
            });

            modelBuilder.Entity<Proizvodac>(entity =>
            {
                entity.HasKey(e => e.Idproizvodaca).HasName("proizvodac_pkey");

                entity.ToTable("proizvodac");

                entity.Property(e => e.Idproizvodaca)
                    .UseIdentityAlwaysColumn()
                    .HasColumnName("idproizvodaca");
                entity.Property(e => e.Nazivproizvodaca)
                    .HasMaxLength(100)
                    .HasColumnName("nazivproizvodaca");
            });

            modelBuilder.Entity<Rezervacija>(entity =>
            {
                entity.HasKey(e => e.Idtermina).HasName("rezervacija_pkey");

                entity.ToTable("rezervacija");

                entity.Property(e => e.Idtermina)
                    .ValueGeneratedNever()
                    .HasColumnName("idtermina");
                entity.Property(e => e.Brojosoba).HasColumnName("brojosoba");
                entity.Property(e => e.Datumkreiranja).HasColumnName("datumkreiranja");
                entity.Property(e => e.Iznos)
                    .HasPrecision(10, 2)
                    .HasColumnName("iznos");
                entity.Property(e => e.Poslanaobavijest).HasColumnName("poslanaobavijest");

                entity.HasOne(d => d.Termin).WithOne(p => p.Rezervacija)
                    .HasForeignKey<Rezervacija>(d => d.Idtermina)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("rezervacija_idtermina_fkey");

                entity.HasMany(d => d.Korisnici).WithMany(p => p.Rezervacije)
                    .UsingEntity<Korisnik_rezervacija>(
                        r => r.HasOne(e => e.Korisnik)
                            .WithMany()
                            .HasForeignKey(e => e.idkorisnika),
                        l => l.HasOne(e => e.Rezervacija)
                            .WithMany()
                            .HasForeignKey(e => e.idtermina),
                        j =>
                        {
                            j.HasKey(e => new { e.idkorisnika, e.idtermina });
                            j.ToTable("korisnik_rezervacija");
                        });
            });

            modelBuilder.Entity<Termin>(entity =>
            {
                entity.HasKey(e => e.Idtermina).HasName("termin_pkey");

                entity.ToTable("termin");

                entity.Property(e => e.Idtermina)
                    .UseIdentityAlwaysColumn()
                    .HasColumnName("idtermina");
                entity.Property(e => e.Idplovila).HasColumnName("idplovila");
                entity.Property(e => e.Vrijemedo)
                    .HasColumnType("timestamp without time zone")
                    .HasColumnName("vrijemedo");
                entity.Property(e => e.Vrijemeod)
                    .HasColumnType("timestamp without time zone")
                    .HasColumnName("vrijemeod");
                entity.Property(e => e.Status)
                    .HasMaxLength(30)
                    .HasColumnName("status");

                entity.HasOne(d => d.Plovilo).WithMany(p => p.Termini)
                    .HasForeignKey(d => d.Idplovila)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("termin_idplovila_fkey");
            });

            modelBuilder.Entity<Tipplovila>(entity =>
            {
                entity.HasKey(e => e.Idtipaplovila).HasName("tipplovila_pkey");

                entity.ToTable("tipplovila");

                entity.Property(e => e.Idtipaplovila)
                    .UseIdentityAlwaysColumn()
                    .HasColumnName("idtipaplovila");
                entity.Property(e => e.Nazivtipaplovila)
                    .HasMaxLength(50)
                    .HasColumnName("nazivtipaplovila");
            });

            modelBuilder.Entity<Usluga>(entity =>
            {
                entity.HasKey(e => e.Idusluge).HasName("usluga_pkey");

                entity.ToTable("usluga");

                entity.Property(e => e.Idusluge)
                    .UseIdentityAlwaysColumn()
                    .HasColumnName("idusluge");
                entity.Property(e => e.Cijenausluge)
                    .HasPrecision(10, 2)
                    .HasColumnName("cijenausluge");
                entity.Property(e => e.Nazivusluge)
                    .HasMaxLength(100)
                    .HasColumnName("nazivusluge");

                entity.HasMany(d => d.Termini)
                    .WithMany(p => p.Usluge)
                    .UsingEntity<Imadodatneusluge>(
                        r => r.HasOne(e => e.Rezervacija)
                            .WithMany()
                            .HasForeignKey(e => e.idtermina),
                        l => l.HasOne(e => e.Usluga)
                            .WithMany()
                            .HasForeignKey(e => e.idusluge),
                        j =>
                        {
                            j.HasKey(e => new { e.idusluge, e.idtermina });
                            j.ToTable("imadodatneusluge");
                        });
            });

            modelBuilder.Entity<Imadodatneusluge>(entity =>
            {

                entity.HasKey(e => new { e.idusluge, e.idtermina });
                entity.ToTable("imadodatneusluge");

                entity.Property(e => e.idtermina).UseIdentityAlwaysColumn().HasColumnName("idtermina");
                entity.Property(e => e.idusluge).UseIdentityAlwaysColumn().HasColumnName("idusluge");
                entity.Property(e => e.cijenadodatneusluge).HasPrecision(10, 2).HasColumnName("cijenadodatneusluge");

                entity.HasOne(d => d.Usluga).WithMany().HasForeignKey(d => d.idusluge);
                entity.HasOne(d => d.Rezervacija).WithMany().HasForeignKey(e => e.idtermina);
            });

            modelBuilder.Entity<Imadodatnuopremu>(entity =>
            {
                entity.HasKey(e => new { e.idtermina, e.idopreme });
                entity.ToTable("imadodatnuopremu");

                entity.Property(e => e.idopreme).UseIdentityAlwaysColumn().HasColumnName("idopreme");
                entity.Property(e => e.idtermina).UseIdentityAlwaysColumn().HasColumnName("idtermina");
                entity.Property(e => e.kolicinaopreme).HasColumnName("kolicinaopreme");
                entity.Property(e => e.cijenadodatneopreme).HasPrecision(10, 2).HasColumnName("cijenadodatneopreme");

                entity.HasOne(d => d.Oprema).WithMany().HasForeignKey(d => d.idopreme);
                entity.HasOne(d => d.Rezervacija).WithMany().HasForeignKey(d => d.idtermina);
            });

            modelBuilder.Entity<Imaopremu>(entity =>
            {
                entity.HasKey(e => new { e.idplovila, e.idopreme });
                entity.ToTable("imaopremu");

                entity.Property(e => e.idopreme).UseIdentityAlwaysColumn().HasColumnName("idopreme");
                entity.Property(e => e.idplovila).UseIdentityAlwaysColumn().HasColumnName("idplovila");

                entity.HasOne(d => d.Oprema).WithMany().HasForeignKey(d => d.idopreme);
                entity.HasOne(d => d.Plovilo).WithMany().HasForeignKey(e => e.idplovila);
            });

            modelBuilder.Entity<Korisnik_rezervacija>(entity =>
            {
                entity.HasKey(e => new { e.idkorisnika, e.idtermina });
                entity.ToTable("korisnik_rezervacija");

                entity.Property(e => e.idkorisnika).UseIdentityAlwaysColumn().HasColumnName("idkorisnika");
                entity.Property(e => e.idtermina).UseIdentityAlwaysColumn().HasColumnName("idtermina");

                entity.HasOne(d => d.Korisnik).WithMany().HasForeignKey(d => d.idkorisnika);
                entity.HasOne(d => d.Rezervacija).WithMany().HasForeignKey(e => e.idtermina);
            });


            OnModelCreatingPartial(modelBuilder);
        });
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}