﻿// <auto-generated />
using System;
using EmptyProject_ClientApp_Work_02.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace EmptyProject_ClientApp_Work_02.Migrations
{
    [DbContext(typeof(JobDbContext))]
    partial class JobDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("EmptyProject_ClientApp_Work_02.Models.JobAdvertisement", b =>
                {
                    b.Property<int>("JobAdvertisementId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("JobAdvertisementName")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<int>("OnlineJobSiteId");

                    b.Property<string>("TypeName")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.HasKey("JobAdvertisementId");

                    b.HasIndex("OnlineJobSiteId");

                    b.ToTable("JobAdvertisements");
                });

            modelBuilder.Entity("EmptyProject_ClientApp_Work_02.Models.OnlineJobSite", b =>
                {
                    b.Property<int>("OnlineJobSiteId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("OnlineJobSiteName")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<DateTime>("StartedJourney")
                        .HasColumnType("date");

                    b.HasKey("OnlineJobSiteId");

                    b.ToTable("OnlineJobSites");
                });

            modelBuilder.Entity("EmptyProject_ClientApp_Work_02.Models.JobAdvertisement", b =>
                {
                    b.HasOne("EmptyProject_ClientApp_Work_02.Models.OnlineJobSite", "OnlineJobSite")
                        .WithMany("JobAdvertisements")
                        .HasForeignKey("OnlineJobSiteId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
