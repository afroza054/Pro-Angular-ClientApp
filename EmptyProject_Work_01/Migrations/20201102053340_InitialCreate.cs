using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace EmptyProject_Work_01.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "OnlineJobSites",
                columns: table => new
                {
                    OnlineJobSiteId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    OnlineJobSiteName = table.Column<string>(maxLength: 50, nullable: false),
                    StartedJourney = table.Column<DateTime>(type: "date", nullable: false),
                    Web = table.Column<string>(nullable: true),
                    Response = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OnlineJobSites", x => x.OnlineJobSiteId);
                });

            migrationBuilder.CreateTable(
                name: "JobAdvertisements",
                columns: table => new
                {
                    JobAdvertisementId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    JobAdvertisementName = table.Column<string>(maxLength: 50, nullable: false),
                    TypeName = table.Column<string>(maxLength: 50, nullable: false),
                    OnlineJobSiteId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobAdvertisements", x => x.JobAdvertisementId);
                    table.ForeignKey(
                        name: "FK_JobAdvertisements_OnlineJobSites_OnlineJobSiteId",
                        column: x => x.OnlineJobSiteId,
                        principalTable: "OnlineJobSites",
                        principalColumn: "OnlineJobSiteId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RegisterApplicants",
                columns: table => new
                {
                    RegisterApplicantId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    RegisterApplicantName = table.Column<string>(maxLength: 50, nullable: false),
                    ContactEmail = table.Column<string>(maxLength: 50, nullable: false),
                    OnlineJobSiteId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RegisterApplicants", x => x.RegisterApplicantId);
                    table.ForeignKey(
                        name: "FK_RegisterApplicants_OnlineJobSites_OnlineJobSiteId",
                        column: x => x.OnlineJobSiteId,
                        principalTable: "OnlineJobSites",
                        principalColumn: "OnlineJobSiteId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_JobAdvertisements_OnlineJobSiteId",
                table: "JobAdvertisements",
                column: "OnlineJobSiteId");

            migrationBuilder.CreateIndex(
                name: "IX_RegisterApplicants_OnlineJobSiteId",
                table: "RegisterApplicants",
                column: "OnlineJobSiteId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "JobAdvertisements");

            migrationBuilder.DropTable(
                name: "RegisterApplicants");

            migrationBuilder.DropTable(
                name: "OnlineJobSites");
        }
    }
}
